import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../../../../models/User";
import {UserService} from "../../../../../services/user.service";

@Component({
    selector: '[user-list-item]',
    templateUrl: 'user-list-item.component.html'
})
export class UserListItemComponent implements OnInit {

    @Input() user: User;

    @Output() id: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _us: UserService) {
    }

    ngOnInit() {
    }

    deleteUser(id) {
        // this._us.deleteUser(id).subscribe(res => {
        //     console.log(res);
        // });
        this.id.emit(id);
    }
}