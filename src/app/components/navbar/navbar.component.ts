import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserService} from "../../services/user.service";
import {BaseComponent} from "../base/base.component";

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent extends BaseComponent implements OnInit {

    isSignedIn: boolean = false;

    isAdmin: boolean = false;

    constructor(private _auth: AuthService,
                private _us: UserService) {
        super();
    }

    ngOnInit() {
        this.verifyCurrentUser();
    }

    verifyCurrentUser() {
        this._us.currentUser.takeWhile(() => this.isAlive).subscribe(
            res => {
                if (res !== null) {
                    this.isSignedIn = true;
                    this.isAdmin = res.role === 4;
                } else {
                    this.isSignedIn = false;
                    this.isAdmin = false;
                }
            }
        );
    }

    signOut() {
        this._us.setCurrentUser(null);
        this._auth.signOut();
    }
}
