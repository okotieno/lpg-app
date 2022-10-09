import { Inject, Injectable } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})

export class PusherService {
  pusher: any;
  ordersChannel: any;
  constructor(@Inject('pusher') pusher: {key: string; cluster: 'string'}) {
    this.pusher = new Pusher(pusher.key, {
      cluster: pusher.cluster,
      encrypted: true
    });
    this.ordersChannel = this.pusher.subscribe('orders');
  }
}
