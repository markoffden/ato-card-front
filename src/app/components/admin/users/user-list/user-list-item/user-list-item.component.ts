import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../../../../models/User";

@Component({
    selector: '[user-list-item]',
    templateUrl: 'user-list-item.component.html'
})
export class UserListItemComponent implements OnInit {

    @Input() user: User;

    @Output() id: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    deleteUser(id) {
        this.id.emit(id);
    }
}
