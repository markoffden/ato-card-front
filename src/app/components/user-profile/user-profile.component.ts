import {Component, OnInit, OnDestroy, HostBinding} from '@angular/core';
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

    @HostBinding('class.page-content-wrapper') pageContentWrapper: boolean = true;

    constructor(private _us: UserService,
                private _es: ErrorService,
                private _ls: LoaderService) {
        this.aliveSubscriptions = true;
    }

    ngOnInit() {
        this._ls.turnLoaderOn();

        this._us.getCurrentUser().takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this.user = res.data;
            },
            error => {
                this._es.handleErrorRes(error);
            },
            () => {
                this._ls.turnLoaderOff();
            }
        );
    }

    ngOnDestroy() {
        this.aliveSubscriptions = false;
    }
}
