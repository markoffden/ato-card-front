import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {

    constructor(private _auth: AuthService) {

    }

    signOut() {
        this._auth.signOut();
    }

    ngOnInit() {

    }

}
