import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtpComponent } from './otp.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    OtpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    OtpComponent
  ]
})
export class OtpModule { }

