import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReceivedOrderPageRoutingModule } from './view-received-order-routing.module';

import { ViewReceivedOrderPage } from './view-received-order.page';
import { ViewOrderItemModule } from "../../components/view-order-item/view-order-item.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewReceivedOrderPageRoutingModule,
        ViewOrderItemModule
    ],
  declarations: [ViewReceivedOrderPage]
})
export class ViewReceivedOrderPageModule {}
