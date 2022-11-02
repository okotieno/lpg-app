import { Injectable } from '@angular/core';
import { IDepot } from '../../interfaces/i-depot';
import { BaseHttpService } from '../../mixins/base-http.service';

@Injectable({
  providedIn: 'root'
})

export class DepotService extends BaseHttpService<IDepot> {
  url = 'depots';

  constructor() {
    super();
  }
}
