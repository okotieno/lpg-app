import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPlacedOrderPage } from './view-placed-order.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPlacedOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPlacedOrderPageRoutingModule {}
