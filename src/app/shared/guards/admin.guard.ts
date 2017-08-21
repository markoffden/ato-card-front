import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from "../../services/user.service";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor (private _us: UserService, private _router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this._us.currentUser.map(res => {
            if (res !== null && res.role === 4) {
                return true;
            } else {
                this._router.navigate(['']);
                return false;
            }
        });
    }
}
