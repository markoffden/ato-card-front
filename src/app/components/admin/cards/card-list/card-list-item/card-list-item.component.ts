import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Card} from "../../../../../models/Card";

@Component({
  selector: '[card-list-item]',
  templateUrl: './card-list-item.component.html'
})
export class CardListItemComponent implements OnInit {

    @Input() card: Card;

    @Output() id: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    deleteCard(id) {
        this.id.emit(id);
    }
}
