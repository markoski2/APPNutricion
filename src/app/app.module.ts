import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxCaptureService } from 'ngx-capture';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//import { Firestore} from 'firebase-admin/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';

//httpclient
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BaseChartDirective,
    NgxCaptureService, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAnalytics(() => getAnalytics()), ScreenTrackingService, provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
