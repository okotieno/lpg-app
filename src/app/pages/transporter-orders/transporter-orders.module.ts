import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransporterOrdersRoutingModule } from './transporter-orders-routing.module';

import { TransporterOrdersPage } from './transporter-orders.page';
import { OrderListItemModule } from "../../components/order-list-item/order-list-item.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TransporterOrdersRoutingModule,
        OrderListItemModule
    ],
  declarations: [TransporterOrdersPage]
})
export class TransporterOrdersModule {}
