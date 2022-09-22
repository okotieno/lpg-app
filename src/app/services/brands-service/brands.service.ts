import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../../interfaces/i-response';
import { IBrand } from '../../interfaces/i-brand';

@Injectable({
  providedIn: 'root'
})

export class BrandsService {
  url = 'brands';

  constructor(private http: HttpClient) {
  }

  getItemWithId(id: number) {
    return this.http.get<IResponse<IBrand>>(
      `${this.url}/${id}`
    );
  }

  getItems({perPage, searchTerm, ids, ...params}: {
    [key: string]: any;
    perPage: number;
    page: number;
    searchTerm?: string;
    ids?: number[];
  }) {
    return this.http.get<IResponse<IBrand[]>>(this.url, {
      params: {
        ['page_size']: perPage,
        searchTerm: searchTerm ?? '',
        ['ids[]']: ids?.map((x) => String(x)) ?? [],
        ...params,
      },
    });
  }
}
