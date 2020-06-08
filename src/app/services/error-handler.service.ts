import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class ErrorHandlerService {

    constructor(private router: Router) {}

    handleError(err: any) {
        if (err?.code === 401) {
            this.router.navigate(['login']);
        }
        return [];
    }
}
