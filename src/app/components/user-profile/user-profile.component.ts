import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

    user: User;

    constructor(private _us: UserService) {

    }

    ngOnInit() {
        this._us.getCurrentUser().subscribe(
            res => {
                this.user = res.data;
            },
            error => {
                console.log(error.message);
            }
        );
    }
}
