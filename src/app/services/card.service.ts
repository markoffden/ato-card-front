import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class CardService {
    constructor(private _api: ApiService) {

    }

    getCards() {
        return this._api.get('cards');
    }

    addCard(card) {
        return this._api.post('cards', card);
    }

    getCardById(id): Observable<any> {
        return this._api.get(`cards/${id}`);
    }

    updateCard(id, card): Observable<any> {
        return this._api.patch(`cards/${id}`, card);
    }

    deleteCard(id): Observable<any> {
        return this._api.delete(`cards/${id}`);
    }
}
