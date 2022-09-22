import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacedOrdersPage } from './placed-orders.page';

const routes: Routes = [
  {
    path: '',
    component: PlacedOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacedOrdersRoutingModule {}
