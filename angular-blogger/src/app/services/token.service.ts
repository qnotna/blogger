import { GoogleAuthService, GoogleApiService } from 'ng-gapi';
import { Injectable, NgZone } from '@angular/core';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
    static SESSION_STORAGE_KEY = 'accessToken';
    constructor(
        private authService: GoogleAuthService,
        private gapi: GoogleApiService,
        private router: Router,
        private ngZone: NgZone) {}

    /**
     * returns auth token from session storage
     */
    getToken(): string {
        const token = sessionStorage.getItem(AuthTokenService.SESSION_STORAGE_KEY);
        return token;
    }

    getTokenObs(): Observable<string> {
        return of(this.getToken());
    }

    /**
     * opens up google pop-up to sign in as google user and sets auth token in local storage
     */
    signIn() {
        return this.authService.getAuth()
        .subscribe((auth: GoogleAuth) => {
            auth.signIn()
            .then((user: GoogleUser) => {
                this.signInSuccessHandler(user);
            })
            .catch(this.handleError)
            .then(() => this.ngZone.run(() => this.router.navigate(['/home'])));
        });
    }

    private signInSuccessHandler(user: GoogleUser) {
        sessionStorage.setItem(AuthTokenService.SESSION_STORAGE_KEY, user.getAuthResponse().access_token);
    }

    private handleError(err) {
        console.log(err);
    }

}
