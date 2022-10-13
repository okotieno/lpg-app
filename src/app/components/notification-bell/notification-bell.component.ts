import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications-service/notifications.service';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationBellComponent implements OnInit {

  newNotificationsCount$ = this.notificationsService.newNotificationsCount$;
  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {}

}
