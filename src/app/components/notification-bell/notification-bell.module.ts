import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationBellComponent } from './notification-bell.component';
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    NotificationBellComponent
  ],
  exports: [
    NotificationBellComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class NotificationBellModule { }
