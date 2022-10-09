import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTransporterOrderRoutingModule } from './view-transporter-order-routing.module';

import { ViewTransporterOrderPage } from './view-transporter-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTransporterOrderRoutingModule
  ],
  declarations: [ViewTransporterOrderPage]
})
export class ViewTransporterOrderModule {}
