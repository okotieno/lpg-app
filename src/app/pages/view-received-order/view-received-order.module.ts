import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReceivedOrderPageRoutingModule } from './view-received-order-routing.module';

import { ViewReceivedOrderPage } from './view-received-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReceivedOrderPageRoutingModule
  ],
  declarations: [ViewReceivedOrderPage]
})
export class ViewReceivedOrderPageModule {}
