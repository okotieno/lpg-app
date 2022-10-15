import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacedOrdersRoutingModule } from './placed-orders-routing.module';

import { PlacedOrdersPage } from './placed-orders.page';
import { OrderListItemModule } from "../../components/order-list-item/order-list-item.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlacedOrdersRoutingModule,
        OrderListItemModule
    ],
  declarations: [PlacedOrdersPage]
})
export class PlacedOrdersPageModule {}
