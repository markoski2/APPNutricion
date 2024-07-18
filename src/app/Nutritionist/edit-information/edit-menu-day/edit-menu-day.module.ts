import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMenuDayPageRoutingModule } from './edit-menu-day-routing.module';

import { EditMenuDayPage } from './edit-menu-day.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMenuDayPageRoutingModule
  ],
  declarations: [EditMenuDayPage]
})
export class EditMenuDayPageModule {}
