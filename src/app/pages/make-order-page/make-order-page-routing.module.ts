import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeOrderPagePage } from './make-order-page.page';

const routes: Routes = [
  {
    path: '',
    component: MakeOrderPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeOrderPagePageRoutingModule {}
