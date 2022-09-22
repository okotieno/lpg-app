import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../../interfaces/i-response';
import { IDealer } from '../../interfaces/i-dealer';

@Injectable({
  providedIn: 'root'
})

export class DealerService {
  url = 'dealers';

  constructor(private http: HttpClient) {
  }

  getItems({perPage, searchTerm, ids, ...params}: {
    [key: string]: any;
    perPage: number;
    page: number;
    searchTerm?: string;
    ids?: number[];
  }) {
    return this.http.get<IResponse<IDealer[]>>(this.url, {
      params: {
        ['page_size']: perPage,
        searchTerm: searchTerm ?? '',
        ['ids[]']: ids?.map((x) => String(x)) ?? [],
        ...params,
      },
    });
  }
}
