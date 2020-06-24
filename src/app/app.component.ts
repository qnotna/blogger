import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.initAuthService().subscribe(success => this.authService.initClient());
  }

}
