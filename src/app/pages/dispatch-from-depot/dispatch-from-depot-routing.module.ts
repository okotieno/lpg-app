import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispatchFromDepotPage } from './dispatch-from-depot.page';

const routes: Routes = [
  {
    path: '',
    component: DispatchFromDepotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispatchFromDepotRoutingModule {}
