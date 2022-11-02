import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order-service/order.service';
import { Observable } from 'rxjs';
import { IOrder } from '../../interfaces/i-order';
import { FormBuilder, Validators } from '@angular/forms';
import { TransporterService } from '../../services/transporter-service/transporter.service';
import { formMixin } from '../../mixins/form.mixin';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-assign-order',
  templateUrl: './assign-order.page.html',
  styleUrls: ['./assign-order.page.scss'],
})
export class AssignOrderPage extends formMixin() implements OnInit {
  authDepotIds$ = this.authService.authDepotIds;
  orderId$ = this.route.paramMap.pipe(
    map((params) => params.get('orderId'))
  );

  form = this.fb.group({
    orderId: [0, [Validators.required]],
    transporterId: [null, [Validators.required]]
  });

  order$: Observable<IOrder> = this.orderId$.pipe(
    tap((orderId) => this.form.get('orderId').setValue(+orderId)),
    switchMap(orderId => this.ordersService.getItemWithId(+orderId)),
    take(1),
    map(({data}) => data)
  );

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
    private fb: FormBuilder,
    public transporterService: TransporterService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    super();
  }

  ngOnInit() {
    console.log('NG ON INIT');
  }

  submitOrderAssign() {
    this.submit({
      action: this.ordersService.assignOrder.bind(this.ordersService),
      successCallback: () => {
        this.router.navigate(['view-received-order', this.form.get('orderId').value]).then();
      }
    });
  }

}
