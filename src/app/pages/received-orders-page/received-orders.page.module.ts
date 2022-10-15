import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivedOrdersRoutingModule } from './received-orders-routing.module';

import { ReceivedOrdersPage } from './received-orders.page';
import { OrderListItemModule } from "../../components/order-list-item/order-list-item.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReceivedOrdersRoutingModule,
        OrderListItemModule
    ],
  declarations: [ReceivedOrdersPage]
})
export class ReceivedOrdersPageModule {}
