import {Component, OnInit, HostBinding} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {ErrorService} from "../../services/error.service";
import {LoaderService} from "../../services/loader.service";
import {BaseComponent} from "../base/base.component";

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent extends BaseComponent implements OnInit {

    user: User;

    @HostBinding('class.page-content-wrapper') pageContentWrapper: boolean = true;

    constructor(private _us: UserService,
                private _es: ErrorService,
                private _ls: LoaderService) {
        super();
    }

    ngOnInit() {
        this._ls.turnLoaderOn();

        this._us.getCurrentUser().subscribe(
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
}
