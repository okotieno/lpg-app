import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from '../../interfaces/i-order';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../services/order-service/order.service';
import { formMixin } from '../../mixins/form.mixin';

@Component({
  selector: 'app-dispatch-from-dealer',
  templateUrl: './dispatch-from-dealer.page.html',
  styleUrls: ['./dispatch-from-dealer.page.scss'],
})
export class DispatchFromDealerPage extends formMixin() implements OnInit {
  form = this.fb.group({
    orderId: [0, [Validators.required]],
    from: 'dealer',
    canisters: this.fb.array([])
  });

  orderId$ = this.route.paramMap.pipe(
    map((params) => params.get('orderId'))
  );
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

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ordersService: OrderService,
    private router: Router
  ) {
    super();
  }

  getOrder() {
    this.orderId$.pipe(
      tap((orderId) => this.form.get('orderId').setValue(+orderId)),
      switchMap(orderId => this.ordersService.getItemWithId(+orderId)),
      take(1),
      map(({data}) => data),
      tap((order) => this.order$.next(order)),
      tap((order) => {
        order.orderQuantities.forEach((item) => {
          for (let i = 0; i < item.quantity; i++) {
            (this.form.get('canisters') as FormArray).push(this.fb.group({
              tagged: [false],
              canisterBrandId: item.canisterBrandId,
              canisterSizeId: item.canisterSizeId,
              inGoodCondition: true,
              canisterConditionDescription: null
            }));
          }
        });
      })
    ).subscribe();
  }

  ngOnInit() {
    this.getOrder();
  }

  submitDispatch() {
    this.submit({
      action: this.ordersService.dispatchCylinders.bind(this.ordersService),
      successCallback: () => {
        this.router.navigate(['view-placed-order', this.form.get('orderId').value]).then();
      }
    });
  }
}
