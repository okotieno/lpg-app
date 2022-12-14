import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPlacedOrderPageRoutingModule } from './view-placed-order-routing.module';

import { ViewPlacedOrderPage } from './view-placed-order.page';
import { ViewOrderItemModule } from "../../components/view-order-item/view-order-item.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewPlacedOrderPageRoutingModule,
        ViewOrderItemModule
    ],
  declarations: [ViewPlacedOrderPage]
})
export class ViewPlacedOrderPageModule {}
