import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransporterToDepotConfirmationPage } from './transporter-to-depot-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: TransporterToDepotConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransporterToDepotConfirmationRoutingModule {}
