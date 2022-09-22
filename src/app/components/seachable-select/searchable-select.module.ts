import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicSelectableModule } from 'ionic-selectable';
import { SearchableSelectComponent } from './searchable-select.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicSelectableModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    SearchableSelectComponent
  ],
  declarations: [
    SearchableSelectComponent
  ]
})
export class SearchableSelectModule {}
