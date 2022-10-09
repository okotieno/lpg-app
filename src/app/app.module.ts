import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { JwtInterceptor } from './interceptors/jwt-interceptor/jwt.interceptor';
import { APIInterceptor } from './interceptors/api-interceptor/api.interceptor';
import { LoadingInterceptor } from './interceptors/loading-interceptor/loading.interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor/error.interceptor';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'passportClient', // you can also use InjectionToken
      useValue: environment.passportClient
    },
    {
      provide: 'apiUrl', // you can also use InjectionToken
      useValue: environment.apiUrl
    },
    {
      provide: 'pusher', // you can also use InjectionToken
      useValue: environment.pusher
    },
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    QRScanner
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
