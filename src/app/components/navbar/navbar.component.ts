import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, NavigationStart} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ErrorService} from "../../services/error.service";

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit, OnDestroy {

    isSignedIn: boolean = false;

    isAdmin: boolean = false;

    aliveSubscriptions: boolean;

    constructor(private _auth: AuthService,
                private _us: UserService,
                private _router: Router,
                private _es: ErrorService) {
        this.aliveSubscriptions = true;
    }

    ngOnInit() {
        this._router.events.takeWhile(() => this.aliveSubscriptions).subscribe(event => {
            if (event instanceof NavigationStart) {
                this.verifyCurrentUser();
            }
        });
    }

    verifyCurrentUser() {
        this.isSignedIn = this._auth.isSignedIn();
        this.isAdmin = false;
        if (this.isSignedIn) {
            this._us.getCurrentUser().takeWhile(() => this.aliveSubscriptions).subscribe(
                res => {
                    this.isAdmin = res.data.role === 4;
                },
                error => {
                    this._es.handleErrorRes(error);
                }
            );
        }
    }

    signOut() {
        this._auth.signOut();
    }

    ngOnDestroy() {
        this.aliveSubscriptions = false;
    }
}
