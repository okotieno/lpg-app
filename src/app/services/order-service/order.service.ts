import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { IResponse } from '../../interfaces/i-response';
import { IOrder } from '../../interfaces/i-order';
import { SHOW_HTTP_LOADER } from '../../helpers/constants';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  url = 'orders';

  constructor(private http: HttpClient) {
  }

  createOrder(data: IOrder) {
    return this.http.post<IResponse<IOrder>>(this.url, data);
  }

  getItems({perPage, searchTerm, ids, ...params}: {
    [key: string]: any;
    perPage: number;
    page: number;
    searchTerm?: string;
    ids?: number[];
  }) {
    return this.http.get<IResponse<IOrder[]>>(this.url, {
      params: {
        ['page_size']: perPage,
        searchTerm: searchTerm ?? '',
        ['ids[]']: ids?.map((x) => String(x)) ?? [],
        ...params,
      },
    });
  }

  getItemWithId(id: number) {
    return this.http.get<IResponse<IOrder>>(
      `${this.url}/${id}`
    );
  }

  acceptOrder({ orderId }: { orderId: number }) {
    return this.http.post<IResponse<IOrder>>(`${this.url}/${orderId}/status`, {
      acceptOrder: true,
    }, {context: new HttpContext().set(SHOW_HTTP_LOADER, true)});
  }

  declineOrder({ orderId }: { orderId: number }) {
    return this.http.post<IResponse<IOrder>>(`${this.url}/${orderId}/status`, {
      declineOrder: true,
    }, {context: new HttpContext().set(SHOW_HTTP_LOADER, true)});
  }

  assignOrder({orderId, transporterId}: {
    orderId: number;
    transporterId: number;
  }) {
    return this.http.post<IResponse<IOrder>>(`${this.url}/${orderId}/status`, {
      transporterId,
    });
  }

  dispatchCylinders({ orderId,...formValue}: {
    orderId: number;
    canisters: { canisterId: number }[];
  }) {
    return this.http.post<IResponse<any>>(
    // return this.http.post<IResponse<ICanisterBatch>>(
      `orders/${orderId}/dispatch`,
      formValue
    );
  }

  confirmCanisterDispatch({ orderId, ...params}: { orderId: number }) {
    console.log({params});
    return this.http.post<IResponse<IOrder>>(`${this.url}/${orderId}/status`, {
      ...params,
    });
  }
}
