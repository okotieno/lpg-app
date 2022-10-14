import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispatchFromDealerPageRoutingModule } from './dispatch-from-dealer-routing.module';

import { DispatchFromDealerPage } from './dispatch-from-dealer.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DispatchFromDealerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DispatchFromDealerPage]
})
export class DispatchFromDealerPageModule {}
