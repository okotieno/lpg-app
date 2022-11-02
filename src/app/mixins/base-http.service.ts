import { IResponse } from '../interfaces/i-response';
import { HttpClient } from '@angular/common/http';
import { AppInjectorService } from './app-injector.service';
import { IDepot } from '../interfaces/i-depot';

export abstract class BaseHttpService<T> {
  protected http: HttpClient;
  abstract url: string;
  protected constructor() {
    const injector = AppInjectorService.getInjector();
    this.http = injector.get(HttpClient);
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

  getItemWithId(id: number) {
    return this.http.get<IResponse<T>>(
      `${this.url}/${id}`
    );
  }
}
