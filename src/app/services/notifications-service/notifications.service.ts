import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { PusherService } from '../pusher-service/pusher.service';
import { NOTIFICATIONS_KEY } from '../../helpers/constants';
import { Preferences } from '@capacitor/preferences';

interface INotification {
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  routerLink: string[] | null;
}

interface IMessage {
  stationType: 'depot' | 'transporter' | 'dealer';
  orderId: number;
  message: string;
  time: string;
  title: string;
  type: string;
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

    authenticationService.auth$.pipe(
      tap(({userId, stationSpecificRoles}) => {
        pusherService.pusher.subscribe(`private-App.Models.User.${userId}`)
          .bind_global((eventName: string, message: IMessage) => {
            if (message.message) {
              let routerLink: string[] | null = null;
              if (message.stationType === 'depot') {
                routerLink = ['/view-received-order', String(message.orderId)];
              } else if (message.stationType === 'dealer') {
                routerLink = ['/view-placed-order', String(message.orderId)];
              } else if(message.stationType === 'transporter') {
                routerLink = ['/view-transporter-order', String(message.orderId)];
              }
              this.updateNotification({
                createdAt: message.time,
                message: message.message, read: false,
                title: message.title,
                routerLink
              });
            }
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
