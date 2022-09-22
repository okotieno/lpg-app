import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeOrderPagePageRoutingModule } from './make-order-page-routing.module';

import { MakeOrderPagePage } from './make-order-page.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { SearchableSelectModule } from '../../components/seachable-select/searchable-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeOrderPagePageRoutingModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    SearchableSelectModule
  ],
  declarations: [MakeOrderPagePage]
})
export class MakeOrderPagePageModule {}
