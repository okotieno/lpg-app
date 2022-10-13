import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IOrder } from '../../interfaces/i-order';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { PusherService } from '../pusher-service/pusher.service';
import { NOTIFICATIONS_KEY } from '../../helpers/constants';
import { Preferences } from '@capacitor/preferences';

interface INotification {
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  routerLink: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications$ = new BehaviorSubject<INotification[]>([]);
  newNotificationsCount$ = this.notifications$.pipe(
    map((allNotifications) => allNotifications.filter(({read}) => !read).length)
  );

  constructor(
    authenticationService: AuthenticationService,
    pusherService: PusherService) {
    Preferences.get({key: NOTIFICATIONS_KEY}).then((res) => {
      if (res.value) {
        this.notifications$.next(JSON.parse(res.value));
      }
    });
    authenticationService.authDealerIds.pipe(
      take(1),
      tap((ids) => {
        ids.forEach(id => {
          pusherService.pusher.subscribe(`order.dealer.${id}`).bind(`order.created`, (order: IOrder) => {
            this.updateNotification({
              createdAt: new Date().toDateString(), message: `Order Id: #${order.orderId}`, read: false,
              title: 'New Order',
              routerLink: ['/view-placed-order', String(order.orderId)]
            });
          });
        });
        ids.forEach(id => {
          pusherService.pusher.subscribe(`order.dealer.${id}`).bind(`order.updated`, (order: IOrder) => {
            this.updateNotification({
              createdAt: new Date().toDateString(), message: `Order Id: #${order.orderId}`, read: false,
              title: 'Updated Order',
              routerLink: ['/view-placed-order', String(order.orderId)]
            });
          });
        });
      })
    ).subscribe();
  }

  updateStoredNotifications() {
    Preferences.set({key: NOTIFICATIONS_KEY, value: JSON.stringify(this.notifications$.value)}).then();
  }

  updateNotification(newNotification: INotification) {
    this.notifications$.next([newNotification, ...this.notifications$.value]);
    this.updateStoredNotifications();
  }

  markNotificationAsRead(i: number) {
    const allNotifications = [...this.notifications$.value];
    allNotifications[i] = {...allNotifications[i], read: true};
    this.notifications$.next(allNotifications);
    this.updateStoredNotifications();
  }

  deleteNotification(i: number) {
    const allNotifications = [...this.notifications$.value];
    allNotifications.splice(i, 1);
    this.notifications$.next(allNotifications);
    this.updateStoredNotifications();
  }
}
