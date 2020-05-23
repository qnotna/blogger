import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';
import { HttpClientModule } from '@angular/common/http';
import { AuthTokenService } from './services/token.service';
import { gapiClientConfig } from './config/google-api.config';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG, useValue: gapiClientConfig
    })
  ],
  providers: [AuthTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
