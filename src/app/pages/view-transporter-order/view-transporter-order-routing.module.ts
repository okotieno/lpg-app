import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTransporterOrderPage } from './view-transporter-order.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTransporterOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTransporterOrderRoutingModule {}
