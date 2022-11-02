import { Injectable } from '@angular/core';
import { IDealer } from '../../interfaces/i-dealer';
import { BaseHttpService } from '../../mixins/base-http.service';

@Injectable({
  providedIn: 'root'
})

export class DealerService extends BaseHttpService<IDealer>{
  url = 'dealers';

  constructor() {
    super();
  }
}
