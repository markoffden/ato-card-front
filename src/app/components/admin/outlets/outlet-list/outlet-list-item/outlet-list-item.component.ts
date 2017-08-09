import {Component, Input} from '@angular/core';
import {Outlet} from "../../../../../models/Outlet";
import {ModalService} from "../../../../../services/modal.service";

@Component({
  selector: '[outlet-list-item]',
  templateUrl: 'outlet-list-item.component.html'
})
export class OutletListItemComponent {

    @Input() outlet: Outlet;

    constructor(private _ms: ModalService) {
    }

    deleteOutlet(id) {
        this._ms.createConfirm('deleteOutlet', id)
    }
}
