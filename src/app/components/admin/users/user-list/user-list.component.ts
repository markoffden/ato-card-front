import {Component, OnInit} from '@angular/core';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';

@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {

    constructor(private _userService: UserService) {
    }

    users: User[];

    ngOnInit() {
        this.users = [];
        this._userService.getUsers().subscribe(users => {
            this.users = users;
        });
    }
}
