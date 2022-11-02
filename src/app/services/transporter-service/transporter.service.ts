import { Injectable } from '@angular/core';
import { ITransporter } from '../../interfaces/i-transporter';
import { BaseHttpService } from '../../mixins/base-http.service';

@Injectable({
  providedIn: 'root'
})

export class TransporterService extends BaseHttpService<ITransporter>{
  url = 'transporters';

  constructor() {
    super();
  }
}
