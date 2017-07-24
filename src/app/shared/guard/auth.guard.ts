import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from "../../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (private _auth: AuthService, private _router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this._auth.isSignedIn()) {
            return true;
        } else {
            this._router.navigate(['sign-in']);
            return false;
        }
    }
}
