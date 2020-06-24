import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ParticleSystemService } from '../services/particle-system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, public particleService: ParticleSystemService) {}

  ngOnInit(): void {
    this.particleService.initParticlesWithSize(50, 10, 50);
  }

  onMouseMove(event: MouseEvent): void {
    this.particleService.onMouseMove(event);
  }

  signIn(): void {
    this.authService.handleAuth();
  }
}
