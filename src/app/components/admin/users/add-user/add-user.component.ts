import {Component} from '@angular/core';
import {UserService} from "../../../../services/user.service";

@Component({
    selector: 'add-user',
    templateUrl: 'add-user.component.html'
})

export class AddUserComponent {

    constructor(private _userService: UserService) {
    }

    addUser(user) {
        var result: any;
        console.log(user);
        result = this._userService.saveUser(user);
        result.subscribe(x => {
            console.log(x);
        });
    }
}
