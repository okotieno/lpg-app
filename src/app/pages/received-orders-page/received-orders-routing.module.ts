import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivedOrdersPage } from './received-orders.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivedOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivedOrdersRoutingModule {}
