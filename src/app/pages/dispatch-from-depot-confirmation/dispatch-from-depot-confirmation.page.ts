import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order-service/order.service';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { IOrder } from '../../interfaces/i-order';
import { IQRInfo } from '../../interfaces/i-qr-info';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formMixin } from '../../mixins/form.mixin';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';


@Component({
  selector: 'app-dispatch-from-depot-confirmation',
  templateUrl: './dispatch-from-depot-confirmation.page.html',
  styleUrls: ['./dispatch-from-depot-confirmation.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DispatchFromDepotConfirmationPage extends formMixin() implements OnInit {
  orderId$ = this.route.paramMap.pipe(
    map((params) => params.get('orderId'))
  );

  dispatchCylinders$ = new BehaviorSubject<IQRInfo[]>([]);

  form = this.fb.group({
    orderId: [0, [Validators.required]],
    depotToTransporterOk: [true]
  });

  sub?: Subscription = null;

  order$ = new BehaviorSubject<IOrder>({
    acceptedAt: '',
    createdAt: '',
    assignedAt: '',
    canisterSizeName: '',
    dealerToTransporter: false,
    depotToTransporter: false,
    fromDepotId: 0,
    isAccepted: false,
    isAssigned: false,
    orderId: 0,
    orderQuantities: [],
    toDealerId: 0,
    transporterToDealer: false,
    transporterToDepot: false
  });

  totalQuantities$ = this.order$.asObservable().pipe(
    map(({orderQuantities}) => orderQuantities.reduce((prev, {quantity}) => prev + quantity, 0))
  );
  scanning$ = new BehaviorSubject(false);

  v$ = combineLatest([this.order$, this.scanning$, this.dispatchCylinders$, this.totalQuantities$]).pipe(
    map(([order, scanning, dispatchCylinders, totalQuantities]) => ({
      order,
      scanning,
      dispatchCylinders,
      totalQuantities
    }))
  );

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private qrScanner: QRScanner,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.orderId$.pipe(
      tap((orderId) => this.form.get('orderId').setValue(+orderId)),
      switchMap(orderId => this.ordersService.getItemWithId(+orderId)),
      take(1),
      map(({data}) => data),
      tap((order) => this.order$.next(order))
    ).subscribe();
  }

  submitOrderDispatch() {
    this.submit({
      action: this.ordersService.confirmCanisterDispatch.bind(this.ordersService),
      successCallback: () => {
        this.router.navigate(['view-transporter-order', this.form.get('orderId').value]).then();
      }
    });
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('camera-view');
    this.qrScanner.hide();
  }

  isAlreadyScanned(id: number) {
    return !!this.dispatchCylinders$.value.find(({id: orderId}) => orderId === id);
  }


  scan() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.scanning$.next(true);
        this.qrScanner.show();
        (window.document.querySelector('ion-app') as HTMLElement).classList.add('camera-view');
        this.cdr.detectChanges();
        this.sub = this.qrScanner.scan().subscribe((info) => {
          const data = JSON.parse(info) as IQRInfo;

          if (this.isAlreadyScanned(data.id)) {
            alert('Already scanned!');
            this.sub.unsubscribe();
            this.scan();
          } else {
            this.scanning$.next(false);
            this.dispatchCylinders$.next([...this.dispatchCylinders$.value, data]);
            // this.canistersControl.push(this.fb.group({
            //   tagged: [true],
            //   inGoodCondition: [true],
            //   canisterConditionDescription: [null],
            //   canisterId: [data.id]
            // }));
            this.hideCamera();
            this.cdr.detectChanges();
            this.sub.unsubscribe();
          }

        });
      } else if (status.denied) {
        alert('Please grant access to Camera');
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
        this.qrScanner.openSettings();
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
        this.qrScanner.openSettings();
      }
    });
  }

  closeScanner() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.hideCamera();
    this.scanning$.next(false);
    this.cdr.detectChanges();
  }
}
