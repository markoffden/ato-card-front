import {Component, OnInit} from '@angular/core';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';

@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {

    constructor(private _us: UserService) {
    }

    users: User[];

    ngOnInit() {
        this.users = [];
        this._us.getUsers().subscribe(res => {
            this.users = res.data;
        });
    }

    removeUser(id) {
        let users = this.users;
        for (let i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                users.splice(i, 1);
            }
        }
    }
}
