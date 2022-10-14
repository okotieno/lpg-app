import { Inject, Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication-service/authentication.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})

export class PusherService {
  pusher: any;
  ordersChannel: any;

  constructor(
    @Inject('pusher') pusher: { key: string; cluster: 'string' },
    @Inject('apiUrl') apiUrl: string,
    private authorisationService: AuthenticationService
  ) {
    this.pusher = new Pusher(pusher.key, {
      cluster: pusher.cluster,
      encrypted: true,
      authEndpoint: `${apiUrl}/broadcasting/auth`,
      auth: {
        headers: {
          ['Accept']: 'application/json',
          ['Authorization']: `Bearer ${this.authorisationService.token}`
        },
      },
    });
    this.ordersChannel = this.pusher.subscribe('orders');
  }
}
