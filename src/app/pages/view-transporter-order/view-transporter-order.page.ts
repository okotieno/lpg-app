import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OrderService } from '../../services/order-service/order.service';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from '../../interfaces/i-order';
import { ActionSheetController, ViewWillEnter } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular/directives/proxies';
import { PusherService } from '../../services/pusher-service/pusher.service';

@Component({
  selector: 'app-view-transporter-order',
  templateUrl: './view-transporter-order.page.html',
  styleUrls: ['./view-transporter-order.page.scss'],
})
export class ViewTransporterOrderPage implements ViewWillEnter, OnInit {

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
    private ordersService: OrderService,
    private actionSheetController: ActionSheetController,
    private pusherService: PusherService
  ) {
  }

  ngOnInit() {
    this.orderId$.pipe(
      tap((orderId) => {
        this.pusherService.pusher.subscribe(`order.${orderId}`).bind('order.updated', (order: IOrder) => {
          this.order$.next({...this.order$.value, ...order});
        });
      })
    ).subscribe();
  }


  ionViewWillEnter() {
    this.getOrder().pipe(
      take(1)
    ).subscribe();
  }

  getOrder() {
    return this.orderId$.pipe(
      switchMap((orderId) => this.ordersService.getItemWithId(+orderId)),
      tap(({data}) => this.order$.next(data))
    );
  }

  doRefresh($event: any) {
    // this.orders$.next([]);
    this.getOrder().pipe(
      take(1),
      tap(() => $event.target.complete())
    ).subscribe();
  }
}
