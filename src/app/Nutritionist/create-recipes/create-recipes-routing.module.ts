import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRecipesPage } from './create-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRecipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRecipesPageRoutingModule {}
