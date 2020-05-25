import { Component } from '@angular/core';
import { AuthTokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private authService: AuthTokenService) { }

  signIn() {
    this.authService.signIn();
  }
}
