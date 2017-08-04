import { Component, OnInit } from '@angular/core';
import {Card} from "../../../../models/Card";
import {CardService} from '../../../../services/card.service';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html'
})

export class CardListComponent implements OnInit {

    constructor(private _cs: CardService) {
    }

    cards: Card[];

    ngOnInit() {
        this.cards = [];
        this._cs.getCards().subscribe(res => {
            this.cards = res.data;
        });
    }

    removeCard(id) {
        this._cs.deleteCard(id).subscribe(
            result => {
                let cards = this.cards;
                for (let i = 0; i < cards.length; i++) {
                    if (cards[i]._id == id) {
                        cards.splice(i, 1);
                    }
                }
            },
            error => {
                console.log(error.message);
            }
        );
    }
}
