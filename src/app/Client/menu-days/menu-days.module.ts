import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuDaysPageRoutingModule } from './menu-days-routing.module';

import { MenuDaysPage } from './menu-days.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuDaysPageRoutingModule
  ],
  declarations: [MenuDaysPage]
})
export class MenuDaysPageModule {}
