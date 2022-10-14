import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { OrderService } from '../../services/order-service/order.service';
import { BehaviorSubject } from 'rxjs';
import { PusherService } from '../../services/pusher-service/pusher.service';
import { IOrder } from '../../interfaces/i-order';

@Component({
  selector: 'app-received-orders-page',
  templateUrl: './received-orders.page.html',
  styleUrls: ['./received-orders.page.scss'],
})
export class ReceivedOrdersPage implements OnInit {
  orders$ = new BehaviorSubject<any[]>([]);
  queryParams = {
    page: 0,
    perPage: 10,
    ['fromDepotIds[]']: [],
    orderByDesc: true,
    orderBy: 'orderId'
  };
  lastPage?: number;
  totalItems = 0;
  depotStations$ = this.authenticationService.authDepotIds.pipe(
    switchMap((fromDepotIds) => {
      this.queryParams = {...this.queryParams, ['fromDepotIds[]']: fromDepotIds};
      return this.getOrders();
    }),
  );

  constructor(
    private authenticationService: AuthenticationService,
    private ordersService: OrderService,
    private pusherService: PusherService
  ) {
  }

  ngOnInit() {
    this.depotStations$.subscribe();
    this.authenticationService.authDepotIds.pipe(
      take(1),
      tap((ids) => {
        ids.forEach(id => {
          ['order.created', 'order.updated'].forEach((bindType) => {
            this.pusherService.pusher.subscribe(`order.depot.${id}`).bind(bindType, (order: IOrder) => {
              this.updateOrder(order);
            });
          });
        });
      })
    ).subscribe();
  }

  updateOrder(order: IOrder) {
    const currentOrders = [...this.orders$.value];
    const existingOrderIndex = currentOrders.findIndex(({orderId}) => orderId === orderId);
    console.log({existingOrderIndex});
    if (existingOrderIndex === -1) {
      this.orders$.next([order, ...this.orders$.value]);
      this.totalItems += 1;
    } else {
      currentOrders[existingOrderIndex] = {...currentOrders[existingOrderIndex], ...order};
      this.orders$.next([...currentOrders]);
    }
  }

  doRefresh($event: any) {
    // this.orders$.next([]);
    this.queryParams = {...this.queryParams, page: 0};
    this.getOrders({refresh: true}).pipe(
      take(1),
      tap(() => $event.target.complete())
    ).subscribe();
  }

  loadData($event: any) {
    if (this.lastPage && this.lastPage <= this.queryParams.page) {
      $event.target.disabled = true;
    } else {
      this.getOrders().pipe(
        take(1),
        tap(() => $event.target.complete())
      ).subscribe();
    }
  }

  getOrders({refresh} = {refresh: false}) {
    this.queryParams = {...this.queryParams, page: this.queryParams.page + 1};
    return this.ordersService.getItems(this.queryParams).pipe(
      tap((res) => {
        if (refresh) {
          this.orders$.next([...res.data]);
        } else {
          this.orders$.next([...this.orders$.value, ...res.data]);
        }

        this.totalItems = res.meta.total;
        this.lastPage = Math.ceil(res.meta.total / this.queryParams.perPage);
      }),
      map(({data}) => data)
    );
  }
}
