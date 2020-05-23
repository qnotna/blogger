import { Component } from '@angular/core';
import { AuthTokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-blogger';

  constructor(private authService: AuthTokenService) {
    authService.signIn();
  }
}
