import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Mqtt from 'paho-mqtt';
import { CommaExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  connectAndBind(
    host: string,
    port: number,
    clientId: string,
    topic:string
  ): Subject<string> {
    const notification$: Subject<string> = new Subject<string>();
    const client = new Mqtt.Client(host, port, clientId);
    client.onMessageArrived = (message: Mqtt.Message) => {
      notification$.next(message.payloadString);
    };

    client.connect({ onSuccess: () => { client.subscribe(topic) } });
    return notification$;
  }
}
