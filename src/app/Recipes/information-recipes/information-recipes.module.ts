import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationRecipesPageRoutingModule } from './information-recipes-routing.module';

import { InformationRecipesPage } from './information-recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationRecipesPageRoutingModule
  ],
  declarations: [InformationRecipesPage]
})
export class InformationRecipesPageModule {}
