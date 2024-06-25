import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationClientPageRoutingModule } from './information-client-routing.module';

import { InformationClientPage } from './information-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationClientPageRoutingModule
  ],
  declarations: [InformationClientPage]
})
export class InformationClientPageModule {}
