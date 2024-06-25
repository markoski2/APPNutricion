import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealTimePage } from './meal-time.page';

const routes: Routes = [
  {
    path: '',
    component: MealTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealTimePageRoutingModule {}
