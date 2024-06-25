import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationRecipesPage } from './information-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: InformationRecipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationRecipesPageRoutingModule {}
