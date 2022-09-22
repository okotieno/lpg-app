import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../../interfaces/i-response';
import { IDepot } from '../../interfaces/i-depot';

@Injectable({
  providedIn: 'root'
})

export class DepotService {
  url = 'depots';

  constructor(private http: HttpClient) {
  }

  getItems({perPage, searchTerm, ids, ...params}: {
    [key: string]: any;
    perPage: number;
    page: number;
    searchTerm?: string;
    ids?: number[];
  }) {
    return this.http.get<IResponse<IDepot[]>>(this.url, {
      params: {
        ['page_size']: perPage,
        searchTerm: searchTerm ?? '',
        ['ids[]']: ids?.map((x) => String(x)) ?? [],
        ...params,
      },
    });
  }
}
