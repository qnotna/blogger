import { GoogleAuthService } from 'ng-gapi';
import { Injectable } from '@angular/core';
import GoogleUser = gapi.auth2.GoogleUser;

@Injectable()
export class AuthTokenService {
    static SESSION_STORAGE_KEY = 'accessToken';
    constructor(private authService: GoogleAuthService) {}

    /**
     * returns auth token from local storage
     */
    getToken(): string {
        const token = sessionStorage.getItem(AuthTokenService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error('No token. Authentication required!');
        }
        return token;
    }

    /**
     * opens up google pop-up to sign in as google user and sets auth token in local storage
     */
    signIn() {
        this.authService.getAuth()
            .subscribe((auth) => {
                auth.signIn()
                    .then(this.signInSuccessHandler)
                    .catch(this.handleError);
                }
            );
    }

    private signInSuccessHandler(user: GoogleUser) {
        sessionStorage.setItem(AuthTokenService.SESSION_STORAGE_KEY, user.getAuthResponse().access_token);
    }

    private handleError(err) {
        console.log(err);
    }

}
