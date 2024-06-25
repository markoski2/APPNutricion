import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuDaysPage } from './menu-days.page';

const routes: Routes = [
  {
    path: '',
    component: MenuDaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuDaysPageRoutingModule {}
