import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthTokenService } from './token.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthTokenService, private router: Router) {}

    canActivate(): Promise<boolean> {
        return this.authService.getTokenObs().toPromise()
            .then(token => {
                if (token !== null) {
                    return true;
                } else {
                    this.router.navigate(['']);
                }
            });
    }
}
