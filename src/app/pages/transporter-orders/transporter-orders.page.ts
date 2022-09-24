import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { OrderService } from '../../services/order-service/order.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transporter-orders-page',
  templateUrl: './transporter-orders.page.html',
  styleUrls: ['./transporter-orders.page.scss'],
})
export class TransporterOrdersPage implements OnInit {
  orders$ = new BehaviorSubject<any[]>([]);
  queryParams = {
    page: 0,
    perPage: 10,
    ['assignedToTransporterIds[]']: [],
    orderByDesc: true,
    orderBy: 'orderId'
  };
  lastPage?: number;
  totalItems = 0;
  dealerStations$ = this.authenticationService.auth$.pipe(
    map((user) => user.stationSpecificRoles.filter(({transporterId}) => !!transporterId)
      .map(({transporterId}) => transporterId)),
    switchMap((assignedToTransporterIds) => {
      this.queryParams = {...this.queryParams, ['assignedToTransporterIds[]']: assignedToTransporterIds};
      return this.getOrders();
    }),
  );

  constructor(
    private authenticationService: AuthenticationService,
    private ordersService: OrderService
  ) {
  }

  ngOnInit() {
    this.dealerStations$.subscribe();
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

