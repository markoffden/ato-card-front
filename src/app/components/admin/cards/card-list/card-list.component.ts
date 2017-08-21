import {Component, OnInit} from '@angular/core';
import {Card} from "../../../../models/Card";
import {CardService} from '../../../../services/card.service';
import {ErrorService} from "../../../../services/error.service";
import {ModalService} from "../../../../services/modal.service";
import {LoaderService} from "../../../../services/loader.service";
import {BaseComponent} from "../../../base/base.component";

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html'
})

export class CardListComponent extends BaseComponent implements OnInit {

    cards: Card[];

    constructor(private _cs: CardService,
                private _ms: ModalService,
                private _es: ErrorService,
                private _ls: LoaderService) {
        super();
        this.cards = [];
    }

    ngOnInit() {
        this._ls.turnLoaderOn();

        this._cs.getCards().subscribe(
            res => {
                this.cards = res.data;
            },
            error => {
                this._es.handleErrorRes(error);
            },
            () => {
                this._ls.turnLoaderOff();
            }
        );

        this._ms.deleteCard.takeWhile(() => this.isAlive).subscribe(
            id => {
                if (id) {
                    this.removeCard(id);
                }
            }
        );
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
                this._es.handleErrorRes(error);
            }
        );
    }
}
