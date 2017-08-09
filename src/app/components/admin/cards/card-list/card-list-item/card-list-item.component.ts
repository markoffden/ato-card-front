import {Component, Input} from '@angular/core';
import {Card} from "../../../../../models/Card";
import {ModalService} from "../../../../../services/modal.service";

@Component({
  selector: '[card-list-item]',
  templateUrl: './card-list-item.component.html'
})
export class CardListItemComponent {

    @Input() card: Card;

    constructor(private _ms: ModalService) {
    }

    deleteCard(id) {
        this._ms.createConfirm('deleteCard', id);
    }
}
