import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthTokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-blogger';
  basePath = 'https://www.googleapis.com';
  apiKey = 'AIzaSyCtiSae5qplDYdvQ_i6n6eIJsJLjapNP4U';

  constructor(private authService: AuthTokenService, private http: HttpClient) {
    authService.signIn();
  }

  testPostCall() {
    this.http.post(`${this.basePath}/blogger/v3/blogs/3785371635900908274/posts`,
    {
      kind: 'blogger#post',
      blog: {
        id: '8070105920543249955'
      },
      title: 'Post',
      content: 'With <b>exciting</b> content...'
    },
    {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    }
    ).subscribe(console.log);
  }
}
