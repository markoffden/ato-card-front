import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Injectable()
export class AdminGuard implements CanActivate {

    isAdmin: boolean = false;

    constructor (private _auth: AuthService, private _us: UserService, private _router: Router) {
        this._us.getCurrentUser().subscribe(res => {
            this.isAdmin = res.data.role === 4;
        });
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.isAdmin) {
            return true;
        } else {
            this._router.navigate(['']);
            return false;
        }
    }
}
