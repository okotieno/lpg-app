import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispatchFromDepotRoutingModule } from './dispatch-from-depot-routing.module';

import { DispatchFromDepotPage } from './dispatch-from-depot.page';
import { SearchableSelectModule } from '../../components/seachable-select/searchable-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispatchFromDepotRoutingModule,
    ReactiveFormsModule,
    SearchableSelectModule
  ],
  declarations: [DispatchFromDepotPage]
})
export class DispatchFromDepotModule {}
