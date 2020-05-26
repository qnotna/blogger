import { GoogleAuthService, GoogleApiService } from 'ng-gapi';
import { Injectable, NgZone } from '@angular/core';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    static SESSION_STORAGE_KEY = 'accessToken';
    private SCOPE = 'https://www.googleapis.com/auth/blogger';
    private auth: GoogleAuth;
    loggedIn: boolean;

    constructor(
        private authService: GoogleAuthService,
        private gapi: GoogleApiService,
        private router: Router,
        private ngZone: NgZone) {
            this.gapi.onLoad().subscribe(success => this.initClient());
        }

    /**
     * returns auth token from session storage
     */
    getToken(): string {
        const token = sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY);
        return token;
    }

    getTokenObs(): Observable<string> {
        return of(this.getToken());
    }

    initClient() {
        this.authService.getAuth()
            .subscribe((auth: GoogleAuth) => {
                this.auth = auth;
                this.auth.isSignedIn.listen(() => this.setSignInStatus());
                this.setSignInStatus();
            });
    }

    handleAuth() {
        if (this.auth.isSignedIn.get()) {
            this.auth.signOut();
        } else {
            this.auth.signIn()
                .then((user: GoogleUser) => {
                    this.signInSuccessHandler(user);
                });
        }
    }

    private signInSuccessHandler(user: GoogleUser) {
        sessionStorage.setItem(AuthService.SESSION_STORAGE_KEY, user.getAuthResponse().access_token);
    }

    private navigateTo(route: string) {
        this.ngZone.run(() => this.router.navigate([route]));
    }

    private setSignInStatus() {
        const user: GoogleUser = this.auth.currentUser.get();
        const isAuthorized = user.hasGrantedScopes(this.SCOPE);
        if (isAuthorized) {
            this.loggedIn = true;
            this.navigateTo('/home');
        } else {
            this.loggedIn = false;
            this.navigateTo('/auth');
        }
    }


}
