import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthTokenService, private router: Router) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      this.router.navigate(['/home']);
    }
  }

  signIn() {
    this.authService.signIn();
  }
}
