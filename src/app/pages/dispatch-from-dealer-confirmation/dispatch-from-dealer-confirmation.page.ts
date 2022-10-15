import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order-service/order.service';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { IOrder } from '../../interfaces/i-order';
import { IQRInfo } from '../../interfaces/i-qr-info';
import { FormBuilder, Validators } from '@angular/forms';
import { formMixin } from '../../mixins/form.mixin';


@Component({
  selector: 'app-dispatch-from-dealer-confirmation',
  templateUrl: './dispatch-from-dealer-confirmation.page.html',
  styleUrls: ['./dispatch-from-dealer-confirmation.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DispatchFromDealerConfirmationPage extends formMixin() implements OnInit {
  orderId$ = this.route.paramMap.pipe(
    map((params) => params.get('orderId'))
  );

  dispatchCylinders$ = new BehaviorSubject<IQRInfo[]>([]);

  form = this.fb.group({
    orderId: [0, [Validators.required]],
    dealerToTransporterOk: [true]
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
}
