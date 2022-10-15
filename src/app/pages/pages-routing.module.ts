import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesPage } from './pages.page';
import { DealerGuard } from '../guards/dealer-guard/dealer.guard';
import { DepotGuard } from '../guards/depot-guard/depot.guard';
import { TransporterGuard } from '../guards/transporter-guard/transporter.guard';

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
    loadChildren: () => import('./make-order-page/make-order-page.module').then(m => m.MakeOrderPagePageModule),
    canLoad: [DealerGuard]
  },
  {
    path: 'placed-orders',
    loadChildren: () => import('./placed-orders-page/placed-orders.page.module').then(m => m.PlacedOrdersPageModule),
    canLoad: [DealerGuard]
  },
  {
    path: 'received-orders',
    loadChildren: () => import('./received-orders-page/received-orders.page.module').then(m => m.ReceivedOrdersPageModule),
    canLoad: [DepotGuard]
  },
  {
    path: 'view-placed-order/:orderId',
    loadChildren: () => import('./view-placed-order/view-placed-order.module').then(m => m.ViewPlacedOrderPageModule),
    canLoad: [DealerGuard]
  },
  {
    path: 'view-received-order/:orderId',
    loadChildren: () => import('./view-received-order/view-received-order.module').then( m => m.ViewReceivedOrderPageModule),
    canLoad: [DepotGuard]
  },
  {
    path: 'assign-order/:orderId',
    loadChildren: () => import('./assign-order/assign-order.module').then( m => m.AssignOrderPageModule),
    canLoad: [DepotGuard]
  },
  {
    path: 'dispatch-from-depot/:orderId',
    loadChildren: () => import('./dispatch-from-depot/dispatch-from-depot.module').then(m => m.DispatchFromDepotModule),
    canLoad: [DepotGuard]
  },
  {
    path: 'dispatch-from-dealer/:orderId',
    loadChildren: () => import('./dispatch-from-dealer/dispatch-from-dealer.module').then(m => m.DispatchFromDealerPageModule),
    canLoad: [DealerGuard]
  },
  {
    path: 'transporter-orders',
    loadChildren: () => import('./transporter-orders/transporter-orders.module').then(m => m.TransporterOrdersModule),
    canLoad: [TransporterGuard]
  },
  {
    path: 'view-transporter-order/:orderId',
    loadChildren: () => import('./view-transporter-order/view-transporter-order.module').then(m => m.ViewTransporterOrderModule),
    canLoad: [TransporterGuard]
  },
  {
    path: 'dispatch-from-depot-confirmation/:orderId',
    loadChildren: () =>
      import('./dispatch-from-depot-confirmation/dispatch-from-depot-confirmation.module').then(m => m.DispatchFromDepotConfirmationModule),
    canLoad: [TransporterGuard]
  },
  {
    path: 'dispatch-from-dealer-confirmation/:orderId',
    loadChildren: () =>
      import('./dispatch-from-dealer-confirmation/dispatch-from-dealer-confirmation.module')
        .then(m => m.DispatchFromDealerConfirmationModule),
    canLoad: [TransporterGuard]
  },
  {
    path: 'transporter-to-dealer-confirmation/:orderId',
    loadChildren: () =>
      import('./transporter-to-dealer-confirmation/transporter-to-dealer-confirmation.module').then(
        m => m.TransporterToDealerConfirmationModule),
    canLoad: [DealerGuard]
  },
  {
    path: 'transporter-to-depot-confirmation/:orderId',
    loadChildren: () =>
      import('./transporter-to-depot-confirmation/transporter-to-depot-confirmation.module').then(
        m => m.TransporterToDepotConfirmationModule),
    canLoad: [DepotGuard]
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
