import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispatchFromDepotConfirmationPage } from './dispatch-from-depot-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: DispatchFromDepotConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispatchFromDepotConfirmationRoutingModule {}
