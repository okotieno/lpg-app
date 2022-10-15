import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransporterToDepotConfirmationRoutingModule } from './transporter-to-depot-confirmation-routing.module';

import { TransporterToDepotConfirmationPage } from './transporter-to-depot-confirmation.page';
import { SearchableSelectModule } from '../../components/seachable-select/searchable-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransporterToDepotConfirmationRoutingModule,
    ReactiveFormsModule,
    SearchableSelectModule
  ],
  declarations: [TransporterToDepotConfirmationPage]
})
export class TransporterToDepotConfirmationModule {}
