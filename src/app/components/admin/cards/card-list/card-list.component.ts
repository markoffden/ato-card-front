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

    // removeUser(id) {
    //     let users = this.users;
    //     for (let i = 0; i < users.length; i++) {
    //         if (users[i]._id == id) {
    //             users.splice(i, 1);
    //         }
    //     }
    // }
}
