import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransporterToDealerConfirmationPage } from './transporter-to-dealer-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: TransporterToDealerConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransporterToDealerConfirmationRoutingModule {}
