import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  lastNotification$: Observable<string>;
  constructor(notificationService: NotificationService) {
    this.lastNotification$ = notificationService
      .connectAndBind(
        environment.targetMqttServer,
        environment.targetMqttPort,
        environment.targetMqttClientId,
        environment.targetMqttTopic
      )
      .pipe(tap((notif) => new Notification('Notification', { body: notif })));
  }

  ngOnInit(): void {
    Notification.requestPermission();
  }
}
