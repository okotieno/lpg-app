import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ViewWillEnter } from '@ionic/angular';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from '../../interfaces/i-order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order-service/order.service';
import { IonItemSliding } from '@ionic/angular/directives/proxies';
import { PusherService } from '../../services/pusher-service/pusher.service';

@Component({
  selector: 'app-view-placed-order',
  templateUrl: './view-placed-order.page.html',
  styleUrls: ['./view-placed-order.page.scss'],
})
export class ViewPlacedOrderPage implements ViewWillEnter, OnInit {

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

  async acceptOrder(slidingItemOrderStatus: IonItemSliding) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Accept Order',
      cssClass: 'ion-danger',
      buttons: [{
        text: 'Please confirm',
        icon: 'checkmark-circle',
        id: 'accept-button',
        data: {
          type: 'accept'
        },
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();

    const {data} = await actionSheet.onDidDismiss();
    if (data) {
      this.orderId$.pipe(
        switchMap(orderId => this.ordersService.acceptOrder({orderId: +orderId})),
        take(1),
        tap(({data: res}) => {
          this.order$.next(res);
          slidingItemOrderStatus.close();
        })
      ).subscribe();
    }
  }


  doRefresh($event: any) {
    // this.orders$.next([]);
    this.getOrder().pipe(
      take(1),
      tap(() => $event.target.complete())
    ).subscribe();
  }
}
