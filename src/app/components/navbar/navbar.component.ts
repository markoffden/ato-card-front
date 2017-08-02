import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, NavigationStart} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {

    isSignedIn: boolean = false;

    isAdmin: boolean = false;

    constructor(private _auth: AuthService, private _us: UserService, private _router: Router) {
        this._router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.verifyCurrentUser();
            }
        });
    }

    verifyCurrentUser() {
        this.isSignedIn = this._auth.isSignedIn();
        this.isAdmin = false;
        if (this.isSignedIn) {
            this._us.getCurrentUser().subscribe(res => {
                this.isAdmin = res.data.role === 4;
            });
        }
    }

    signOut() {
        this._auth.signOut();
    }

    ngOnInit() {

    }

}
