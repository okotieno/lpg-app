import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOrderItemComponent } from './view-order-item.component';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    ViewOrderItemComponent
  ],
  exports: [
    ViewOrderItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ViewOrderItemModule { }
