import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationClientPage } from './information-client.page';

const routes: Routes = [
  {
    path: '',
    component: InformationClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationClientPageRoutingModule {}
