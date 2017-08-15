import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';
import {ErrorService} from "../../../../services/error.service";
import {ModalService} from "../../../../services/modal.service";
import {LoaderService} from "../../../../services/loader.service";

@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit, OnDestroy {

    private users: User[];

    private aliveSubscriptions: boolean;

    constructor(private _us: UserService,
                private _es: ErrorService,
                private _ms: ModalService,
                private _ls: LoaderService) {
        this.users = [];
        this.aliveSubscriptions = true;
    }

    ngOnInit() {

        this._us.getUsers().takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this.users = res.data;
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );

        this._ms.deleteUser.takeWhile(() => this.aliveSubscriptions).subscribe(
            id => {
                if (id) {
                    this.removeUser(id);
                }
            }
        );
    }

    removeUser(id) {
        this._us.deleteUser(id).takeWhile(() => this.aliveSubscriptions).subscribe(
            result => {
                let users = this.users;
                for (let i = 0; i < users.length; i++) {
                    if (users[i]._id == id) {
                        users.splice(i, 1);
                    }
                }
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
