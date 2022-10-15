import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications-service/notifications.service';
import { IonItemSliding } from '@ionic/angular/directives/proxies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications$ = this.notificationsService.notifications$;

  constructor(
    private notificationsService: NotificationsService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  markNotificationAsRead(i: number, ionItemSliding: IonItemSliding) {
    ionItemSliding.close().then(() => {
      this.notificationsService.markNotificationAsRead(i);
    });
  }

  deleteNotification(i: number, ionItemSliding: IonItemSliding) {
    ionItemSliding.close().then(() => {
      this.notificationsService.deleteNotification(i);
    });
  }

  visitNotificationItem(routerLink: string[], i: number) {
    this.notificationsService.markNotificationAsRead(i);
    console.log({routerLink});
    this.router.navigate(routerLink).then();
  }
}
