import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMenuDayPage } from './edit-menu-day.page';

const routes: Routes = [
  {
    path: '',
    component: EditMenuDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMenuDayPageRoutingModule {}
