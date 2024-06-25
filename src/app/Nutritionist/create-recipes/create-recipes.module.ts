import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRecipesPageRoutingModule } from './create-recipes-routing.module';

import { CreateRecipesPage } from './create-recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRecipesPageRoutingModule
  ],
  declarations: [CreateRecipesPage]
})
export class CreateRecipesPageModule {}
