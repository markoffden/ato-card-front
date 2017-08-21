import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
    readonly storageKey: string = 'ato-card-jwt';

    constructor (private _router: Router) {

    }

    setToken(token: string) {
        localStorage.setItem(this.storageKey, token);
    }

    getToken() {
        return localStorage.getItem(this.storageKey);
    }

    isSignedIn() {
        return this.getToken() !== null;
    }

    signOut() {
        localStorage.removeItem(this.storageKey);
        this._router.navigate(['sign-in']);
    }
}
