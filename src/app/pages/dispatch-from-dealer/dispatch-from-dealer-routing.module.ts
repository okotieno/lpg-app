import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispatchFromDealerPage } from './dispatch-from-dealer.page';

const routes: Routes = [
  {
    path: '',
    component: DispatchFromDealerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispatchFromDealerPageRoutingModule {}
