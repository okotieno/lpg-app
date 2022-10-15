import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTransporterOrderRoutingModule } from './view-transporter-order-routing.module';

import { ViewTransporterOrderPage } from './view-transporter-order.page';
import { ViewOrderItemModule } from "../../components/view-order-item/view-order-item.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewTransporterOrderRoutingModule,
        ViewOrderItemModule
    ],
  declarations: [ViewTransporterOrderPage]
})
export class ViewTransporterOrderModule {}
