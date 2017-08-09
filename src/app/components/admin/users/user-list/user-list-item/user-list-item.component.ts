import {Component, Input} from '@angular/core';
import {User} from "../../../../../models/User";
import {ModalService} from "../../../../../services/modal.service";

@Component({
    selector: '[user-list-item]',
    templateUrl: 'user-list-item.component.html'
})
export class UserListItemComponent {

    @Input() user: User;

    constructor(private _ms: ModalService) {
    }

    deleteUser(id) {
        this._ms.createConfirm('deleteUser', id);
    }
}
