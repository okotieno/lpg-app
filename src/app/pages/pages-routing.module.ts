import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    pathMatch: 'full'
  },
  {
    path: 'dispatch-from-depot/:orderId',
    loadChildren: () => import('./dispatch-from-depot/dispatch-from-depot.module').then( m => m.DispatchFromDepotModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
