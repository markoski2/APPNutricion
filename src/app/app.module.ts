import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxCaptureService } from 'ngx-capture';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BaseChartDirective,NgxCaptureService],
  bootstrap: [AppComponent],
})
export class AppModule {}
