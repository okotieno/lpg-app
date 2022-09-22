import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { GuestGuard } from './guards/guest-guard/guest.guard';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canLoad: [GuestGuard]
  },
  {
    path: 'forgot-password',
    pathMatch: 'full',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
    canLoad: [GuestGuard]
  },
  {
    path: 'forgot-password/otp',
    pathMatch: 'full',
    loadChildren: () => import('./pages/forgot-password-otp/forgot-password-otp.module').then( m => m.ForgotPasswordPageModule),
    canLoad: [GuestGuard]
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./pages/password-reset/password-reset.module').then( m => m.PasswordResetPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
