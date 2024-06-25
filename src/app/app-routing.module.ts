import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'homeNutritionist',
    loadChildren: () => import('./Nutritionist/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'createClient',
    loadChildren: () => import('./Nutritionist/create-client/create-client.module').then( m => m.CreateClientPageModule)
  },
  {
    path: 'mealTime',
    loadChildren: () => import('./Nutritionist/meal-time/meal-time.module').then( m => m.MealTimePageModule)
  },
  {
    path: 'createRecipes',
    loadChildren: () => import('./Nutritionist/create-recipes/create-recipes.module').then( m => m.CreateRecipesPageModule)
  },
  {
    path: 'informationClient',
    loadChildren: () => import('./Nutritionist/information-client/information-client.module').then( m => m.InformationClientPageModule)
  },
  {
    path: 'homeClient',
    loadChildren: () => import('./Client/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./Client/information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'menuDays',
    loadChildren: () => import('./Client/menu-days/menu-days.module').then( m => m.MenuDaysPageModule)
  },
  {
    path: 'informationRecipes',
    loadChildren: () => import('./Recipes/information-recipes/information-recipes.module').then( m => m.InformationRecipesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
