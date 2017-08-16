import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {ErrorService} from "../../services/error.service";
import {LoaderService} from "../../services/loader.service";

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {

    user: User;

    aliveSubscriptions: boolean;

    constructor(private _us: UserService,
                private _es: ErrorService,
                private _ls: LoaderService) {
        this.aliveSubscriptions = true;
    }

    ngOnInit() {
        this._ls.toggleLoader(true);

        this._us.getCurrentUser().takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this.user = res.data;
            },
            error => {
                this._es.handleErrorRes(error);
            },
            () => {
                setTimeout(() => {
                    this._ls.toggleLoader(false);
                }, 750);
            }
        );
    }

    ngOnDestroy() {
        this.aliveSubscriptions = false;
    }
}
