import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class OutletService {
    constructor(private _api: ApiService) {

    }

    getOutlets() {
        return this._api.get('outlets');
    }

    addOutlet(outlet) {
        return this._api.post('outlets', outlet);
    }

    getOutletById(id): Observable<any> {
        return this._api.get(`outlets/${id}`);
    }

    updateOutlet(id, outlet): Observable<any> {
        return this._api.patch(`outlets/${id}`, outlet);
    }

    deleteOutlet(id): Observable<any> {
        return this._api.delete(`outlets/${id}`);
    }
}
