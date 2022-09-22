import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivedOrdersRoutingModule } from './received-orders-routing.module';

import { ReceivedOrdersPage } from './received-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivedOrdersRoutingModule
  ],
  declarations: [ReceivedOrdersPage]
})
export class ReceivedOrdersPageModule {}
