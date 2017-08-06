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
                this.user.gender = this._us.switchGender(this.user.gender);
                this.user.role = this._us.switchRole(this.user.role);
                this.user.activated = this._us.switchActivated(this.user.activated);
            },
            error => {
                console.log(error.message);
            }
        );
    }
}
