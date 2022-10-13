import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./dispatch-from-depot/dispatch-from-depot.module').then(m => m.DispatchFromDepotModule)
  },
  {
    path: 'transporter-orders',
    loadChildren: () => import('./transporter-orders/transporter-orders.module').then(m => m.TransporterOrdersModule)
  },
  {
    path: 'view-transporter-order/:orderId',
    loadChildren: () => import('./view-transporter-order/view-transporter-order.module').then(m => m.ViewTransporterOrderModule)
  },
  {
    path: 'dispatch-from-depot-confirmation/:orderId',
    loadChildren: () =>
      import('./dispatch-from-depot-confirmation/dispatch-from-depot-confirmation.module').then(m => m.DispatchFromDepotConfirmationModule)
  },
  {
    path: 'transporter-to-dealer-confirmation/:orderId',
    loadChildren: () =>
      import('./transporter-to-dealer-confirmation/transporter-to-dealer-confirmation.module').then(
        m => m.TransporterToDealerConfirmationModule)
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications/notifications.module').then(
        m => m.NotificationsPageModule)
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
