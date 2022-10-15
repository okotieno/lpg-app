import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OrderService } from '../../services/order-service/order.service';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from '../../interfaces/i-order';
import { ActionSheetController, ViewWillEnter } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular/directives/proxies';
import { PusherService } from '../../services/pusher-service/pusher.service';

@Component({
  selector: 'app-view-received-order',
  templateUrl: './view-received-order.page.html',
  styleUrls: ['./view-received-order.page.scss'],
})
export class ViewReceivedOrderPage implements ViewWillEnter {

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
    this.orderId$.pipe(
      take(1),
      tap((id) => {
        this.pusherService.pusher.subscribe(`order.${id}`).bind(`order.updated`, (order: IOrder) => {
          this.order$.next(order);
        });
      })
    ).subscribe();
  }


  ionViewWillEnter() {
    this.getOrder();
  }

  getOrder() {
    this.orderId$.pipe(
      switchMap((orderId) => this.ordersService.getItemWithId(+orderId)),
      tap(({data}) => this.order$.next(data)),
      take(1)
    ).subscribe();
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
}
