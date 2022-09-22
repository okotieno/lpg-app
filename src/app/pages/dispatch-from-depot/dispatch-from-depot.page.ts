import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order-service/order.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder } from '../../interfaces/i-order';
import { FormBuilder, Validators } from '@angular/forms';
import { formMixin } from '../../mixins/form.mixin';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';


@Component({
  selector: 'app-dispatch-from-depot',
  templateUrl: './dispatch-from-depot.page.html',
  styleUrls: ['./dispatch-from-depot.page.scss'],
})
export class DispatchFromDepotPage extends formMixin() implements OnInit {
  orderId$ = this.route.paramMap.pipe(
    map((params) => params.get('orderId'))
  );

  dispatchCylinders$ = new BehaviorSubject<{ id: number; size: number; ['RFID']: string; brand: string}[]>([]);

  form = this.fb.group({
    orderId: [0, [Validators.required]],
    canisterIds: [[]]
  });

  order$: Observable<IOrder> = this.orderId$.pipe(
    tap((orderId) => this.form.get('orderId').setValue(+orderId)),
    switchMap(orderId => this.ordersService.acceptOrder({orderId: +orderId})),
    take(1),
    map(({data}) => data)
  );
  scanning$ = new BehaviorSubject(false);

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private qrScanner: QRScanner
  ) {
    super();
  }

  ngOnInit() {

  }

  submitOrderAssign() {
    this.submit({
      action: this.ordersService.assignOrder.bind(this.ordersService),
      successCallback: () => {
        this.router.navigate(['/pages', 'view-received-order', this.form.get('orderId').value]).then();
      }
    });
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('camera-view');
    this.scanning$.next(false);
  }

  showCamera() {
    this.scanning$.next(true);
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('camera-view');
    console.log((window.document.querySelector('ion-app') as HTMLElement));
    this.qrScanner.show();
    this.qrScanner.scan().subscribe((info) => {
      const data = JSON.parse(info);
      this.dispatchCylinders$.next([...this.dispatchCylinders$.value, data]);
      this.hideCamera();
    }, (err) => {
      console.log(err);
    });
  }

  scan() {
    this.showCamera(); // Remove
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        let x = 0;
        while (x < 10) {
          this.showCamera();
          x = x + 1;
        }
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

}
