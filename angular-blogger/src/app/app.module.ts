import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';
import { HttpClientModule } from '@angular/common/http';
import { AuthTokenService } from './services/token.service';
import { gapiClientConfig } from './config/google-api.config';
import { ApiWebService } from './api/api.web.service';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG, useValue: gapiClientConfig
    })
  ],
  providers: [AuthTokenService, ApiWebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
