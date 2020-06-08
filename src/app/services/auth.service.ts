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
    private user: GoogleUser;
    loggedIn: boolean;

    constructor(
        private authService: GoogleAuthService,
        private gapi: GoogleApiService,
        private router: Router,
        private ngZone: NgZone) {
        }

    initAuthService() {
        return this.gapi.onLoad();
    }

    getAuth() {
        return this.auth;
    }
    /**
     * returns OAuth-Token from session storage
     */
    getToken(): string {
        const token = sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY);
        return token;
    }


    /**
     * returns OAuth-Token wrapped in Observable
     */
    get getToken$(): Observable<string> {
        return of(this.getToken());
    }

    /**
     * Sets OAuth-Token in sessionStorage,
     * authorizes user for next page
     * and GoogleAuth to listen to any changes when user is logging in or out
     */
    initClient() {
        this.authService.getAuth()
            .subscribe((auth: GoogleAuth) => {
                this.auth = auth;
                this.auth.isSignedIn.listen(() => this.setSignInStatus());
                this.setSignInStatus();
            });
    }

    /**
     * Depending if the user is signed in or logged in the user is logged out or in
     */
    handleAuth() {
        if (this.auth.isSignedIn.get()) {
            this.auth.signOut();
        } else {
            this.auth.signIn()
                .then((user: GoogleUser) => {
                    this.user = user;
                });
        }
    }


    private navigateTo(route: string) {
        this.ngZone.run(() => this.router.navigate([route]));
    }

    /**
     * Depending if the current user is authorized or has blogger-scope:
     *  - OAuth-Token is set in sessionStorage and will be navigated to home or login page
     */
    private setSignInStatus() {
        const user: GoogleUser = this.auth.currentUser.get();
        const isAuthorized = user.hasGrantedScopes(this.SCOPE);
        if (isAuthorized) {
            sessionStorage.setItem(AuthService.SESSION_STORAGE_KEY, user.getAuthResponse().access_token);
            this.loggedIn = true;
            this.navigateTo('home');
        } else {
            this.loggedIn = false;
            this.navigateTo('login');
        }
    }


}
