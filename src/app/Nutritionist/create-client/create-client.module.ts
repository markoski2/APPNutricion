import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateClientPageRoutingModule } from './create-client-routing.module';

import { CreateClientPage } from './create-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateClientPageRoutingModule
  ],
  declarations: [CreateClientPage]
})
export class CreateClientPageModule {}
