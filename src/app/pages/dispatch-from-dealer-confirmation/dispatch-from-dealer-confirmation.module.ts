import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispatchFromDealerConfirmationRoutingModule } from './dispatch-from-dealer-confirmation-routing.module';

import { DispatchFromDealerConfirmationPage } from './dispatch-from-dealer-confirmation.page';
import { SearchableSelectModule } from '../../components/seachable-select/searchable-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispatchFromDealerConfirmationRoutingModule,
    ReactiveFormsModule,
    SearchableSelectModule
  ],
  declarations: [DispatchFromDealerConfirmationPage]
})
export class DispatchFromDealerConfirmationModule {}
