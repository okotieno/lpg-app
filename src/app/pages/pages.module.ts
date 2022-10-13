import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';
import { NotificationBellModule } from "../components/notification-bell/notification-bell.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PagesRoutingModule,
        NotificationBellModule
    ],
  declarations: [PagesPage]
})
export class PagesModule {}
