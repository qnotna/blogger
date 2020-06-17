import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPresenter } from './login.presenter';
import { Location } from './particles/ParticleModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ LoginPresenter ]
})
export class LoginComponent implements OnInit {
  mouseLocation: Location;

  constructor(private authService: AuthService, public presenter: LoginPresenter) {}

  ngOnInit(): void {
    this.presenter.initParticlesWithSize(50, 10, 50);
  }

  onMouseMove(event: MouseEvent): void {
    this.mouseLocation = {
      x: event.clientX,
      y: event.clientY
    } as Location;
  }

  signIn(): void {
    this.authService.handleAuth();
  }
}
