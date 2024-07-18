import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInformationPage } from './edit-information.page';

const routes: Routes = [
  {
    path: '',
    component: EditInformationPage
  },
  {
    path: 'EditMenuDay',
    loadChildren: () => import('../../Nutritionist/edit-information/edit-menu-day/edit-menu-day.module').then( m => m.EditMenuDayPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInformationPageRoutingModule {}
