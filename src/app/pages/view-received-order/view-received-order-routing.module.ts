import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReceivedOrderPage } from './view-received-order.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReceivedOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReceivedOrderPageRoutingModule {}
