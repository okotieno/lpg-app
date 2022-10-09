import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispatchFromDepotConfirmationRoutingModule } from './dispatch-from-depot-confirmation-routing.module';

import { DispatchFromDepotConfirmationPage } from './dispatch-from-depot-confirmation.page';
import { SearchableSelectModule } from '../../components/seachable-select/searchable-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispatchFromDepotConfirmationRoutingModule,
    ReactiveFormsModule,
    SearchableSelectModule
  ],
  declarations: [DispatchFromDepotConfirmationPage]
})
export class DispatchFromDepotConfirmationModule {}
