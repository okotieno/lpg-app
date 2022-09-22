import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: PagesPage
  },
  {
    path: 'make-order',
    loadChildren: () => import('./make-order-page/make-order-page.module').then(m => m.MakeOrderPagePageModule)
  },
  {
    path: 'placed-orders',
    loadChildren: () => import('./placed-orders-page/placed-orders.page.module').then(m => m.PlacedOrdersPageModule)
  },
  {
    path: 'received-orders',
    loadChildren: () => import('./received-orders-page/received-orders.page.module').then(m => m.ReceivedOrdersPageModule)
  },
  {
    path: 'view-placed-order/:orderId',
    loadChildren: () => import('./view-placed-order/view-placed-order.module').then( m => m.ViewPlacedOrderPageModule)
  },
  {
    path: 'view-received-order/:orderId',
    loadChildren: () => import('./view-received-order/view-received-order.module').then( m => m.ViewReceivedOrderPageModule)
  },
  {
    path: 'assign-order/:orderId',
    loadChildren: () => import('./assign-order/assign-order.module').then( m => m.AssignOrderPageModule)
  },
  {
    path: 'dispatch-from-depot/:orderId',
    loadChildren: () => import('./dispatch-from-depot/dispatch-from-depot.module').then( m => m.DispatchFromDepotModule)
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
