import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordOtpPage } from './forgot-password-otp.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ForgotPasswordOtpPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordPageRoutingModule {}
