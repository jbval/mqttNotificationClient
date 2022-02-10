import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
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

    this.lastNotification$ = notificationService.connectAndBind(
      environment.targetMqttServer,
      environment.targetMqttPort,
      environment.targetMqttClientId,
      environment.targetMqttTopic,
    );
  }

  ngOnInit(): void {}
}
