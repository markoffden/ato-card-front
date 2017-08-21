import {Component, OnInit} from '@angular/core';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';
import {ErrorService} from "../../../../services/error.service";
import {ModalService} from "../../../../services/modal.service";
import {LoaderService} from "../../../../services/loader.service";
import {BaseComponent} from "../../../base/base.component";

@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent extends BaseComponent implements OnInit {

    users: User[];

    constructor(private _us: UserService,
                private _es: ErrorService,
                private _ms: ModalService,
                private _ls: LoaderService) {
        super();
        this.users = [];
    }

    ngOnInit() {
        this._ls.turnLoaderOn();

        this._us.getUsers().subscribe(
            res => {
                this.users = res.data;
            },
            error => {
                this._es.handleErrorRes(error);
            },
            () => {
                this._ls.turnLoaderOff();
            }
        );

        this._ms.deleteUser.takeWhile(() => this.isAlive).subscribe(
            id => {
                if (id) {
                    this.removeUser(id);
                }
            }
        );
    }

    removeUser(id) {
        this._us.deleteUser(id).subscribe(
            res => {
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
}
