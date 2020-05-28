import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';
import { HttpClientModule } from '@angular/common/http';
import { gapiClientConfig } from './config/google-api.config';
import { MainComponent } from './features/main/container/main.component';
import { MaterialModule } from 'src/material/material.module';
import { LoginComponent } from './features/login/login.component';
import { BlogOverviewComponent } from './features/header/components/blog-overview/blog-overview.component';
import { HeaderComponent } from './features/header/container/header.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    BlogOverviewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG, useValue: gapiClientConfig
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
