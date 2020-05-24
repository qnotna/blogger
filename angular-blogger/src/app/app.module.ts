import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';
import { HttpClientModule } from '@angular/common/http';
import { gapiClientConfig } from './config/google-api.config';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG, useValue: gapiClientConfig
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
