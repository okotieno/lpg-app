import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransporterToDealerConfirmationRoutingModule } from './transporter-to-dealer-confirmation-routing.module';

import { TransporterToDealerConfirmationPage } from './transporter-to-dealer-confirmation.page';
import { SearchableSelectModule } from '../../components/seachable-select/searchable-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransporterToDealerConfirmationRoutingModule,
    ReactiveFormsModule,
    SearchableSelectModule
  ],
  declarations: [TransporterToDealerConfirmationPage]
})
export class TransporterToDealerConfirmationModule {}
