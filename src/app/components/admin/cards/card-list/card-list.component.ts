import {Component, OnInit, OnDestroy} from '@angular/core';
import {Card} from "../../../../models/Card";
import {CardService} from '../../../../services/card.service';
import {ErrorService} from "../../../../services/error.service";
import {ModalService} from "../../../../services/modal.service";

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html'
})

export class CardListComponent implements OnInit, OnDestroy {

    cards: Card[];

    aliveSubscriptions: boolean;

    constructor(private _cs: CardService,
                private _ms: ModalService,
                private _es: ErrorService) {
        this.cards = [];
        this.aliveSubscriptions = true;
    }

    ngOnInit() {
        this._cs.getCards().takeWhile(() => this.aliveSubscriptions).subscribe(res => {
            this.cards = res.data;
        });

        this._ms.deleteCard.takeWhile(() => this.aliveSubscriptions).subscribe(
            id => {
                if (id) {
                    this.removeCard(id);
                }
            }
        );
    }

    removeCard(id) {
        this._cs.deleteCard(id).takeWhile(() => this.aliveSubscriptions).subscribe(
            result => {
                let cards = this.cards;
                for (let i = 0; i < cards.length; i++) {
                    if (cards[i]._id == id) {
                        cards.splice(i, 1);
                    }
                }
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }

    ngOnDestroy() {
        this.aliveSubscriptions = false;
    }
}
