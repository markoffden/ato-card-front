import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {ErrorService} from "../../services/error.service";

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {

    user: User;

    aliveSubscriptions: boolean;

    constructor(private _us: UserService, private _es: ErrorService) {
        this.aliveSubscriptions = true;
    }

    ngOnInit() {
        this._us.getCurrentUser().takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this.user = res.data;
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }

    ngOnDestroy() {
        this.aliveSubscriptions = false;
    }
}
