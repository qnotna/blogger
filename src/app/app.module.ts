// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

// Modules
import { GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from 'src/material/material.module';
import { gapiClientConfig } from './config/google-api.config';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './features/main/container/main.component';
import { LoginComponent } from './features/login/login.component';
import { BlogOverviewComponent } from './features/header/components/blog-overview/blog-overview.component';
import { HeaderComponent } from './features/header/container/header.component';
<<<<<<< HEAD
import { PostOverviewComponent } from './features/post-overview/container/post-overview.component';
import { SearchComponent } from './features/header/components/search/search.component';
import { PostItemComponent } from './features/post-overview/components/post-item/post-item.component';
=======
>>>>>>> 1cecc69a2bed133983972665679a1aff7027c2ed
import { MyDialogComponent } from './features/my-dialog/my-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    PostOverviewComponent,
    BlogOverviewComponent,
    HeaderComponent,
<<<<<<< HEAD
    SearchComponent,
    PostItemComponent,
=======
>>>>>>> 1cecc69a2bed133983972665679a1aff7027c2ed
    MyDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    GoogleApiModule.forRoot({
<<<<<<< HEAD
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig,
=======
      provide: NG_GAPI_CONFIG, useValue: gapiClientConfig
>>>>>>> 1cecc69a2bed133983972665679a1aff7027c2ed
    }),
    FormsModule,
    MatDialogModule,
  ],
  entryComponents:[
    MyDialogComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
