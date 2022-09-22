import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignOrderPageRoutingModule } from './assign-order-routing.module';

import { AssignOrderPage } from './assign-order.page';
import { SearchableSelectModule } from '../../components/seachable-select/searchable-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignOrderPageRoutingModule,
    ReactiveFormsModule,
    SearchableSelectModule
  ],
  declarations: [AssignOrderPage]
})
export class AssignOrderPageModule {}
