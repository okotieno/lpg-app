import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { OrderService } from '../../services/order-service/order.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { IOrder } from '../../interfaces/i-order';
import { ActionSheetController, ViewWillEnter } from '@ionic/angular';
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
    this.getOrder().pipe(
      take(1)
    ).subscribe();
  }

  getOrder() {
    return this.orderId$.pipe(
      switchMap((orderId) => this.ordersService.getItemWithId(+orderId)),
      tap(({data}) => this.order$.next(data)),
    );
  }

  async acceptOrder() {
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
        })
      ).subscribe();
    }
  }

  async declineOrder() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Decline Order',
      cssClass: 'ion-color-danger',
      buttons: [{
        text: 'Please confirm',
        icon: 'ban-outline',
        id: 'decline-button',
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
        switchMap(orderId => this.ordersService.declineOrder({orderId: +orderId})),
        take(1),
        tap(({data: res}) => {
          this.order$.next(res);
        })
      ).subscribe();
    }
  }

  doRefresh($event: any) {
    this.getOrder().pipe(
      take(1),
      tap(() => $event.target.complete()),
      catchError((err) => {
        $event.target.complete();
        return throwError(err);
      })
    ).subscribe();
  }
}
