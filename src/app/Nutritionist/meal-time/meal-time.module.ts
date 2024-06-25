import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealTimePageRoutingModule } from './meal-time-routing.module';

import { MealTimePage } from './meal-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealTimePageRoutingModule
  ],
  declarations: [MealTimePage]
})
export class MealTimePageModule {}
