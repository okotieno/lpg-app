import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordOtpPage } from './forgot-password-otp.page';
import { OtpModule } from '../../components/otp/otp.module';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ForgotPasswordPageRoutingModule,
      ReactiveFormsModule,
      OtpModule
    ],
  declarations: [ForgotPasswordOtpPage]
})
export class ForgotPasswordOtpModule {}
