import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderListItemComponent } from './order-list-item.component';
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    OrderListItemComponent
  ],
  exports: [
    OrderListItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule
  ]
})
export class OrderListItemModule { }
