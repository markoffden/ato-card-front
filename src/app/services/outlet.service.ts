import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import 'rxjs/add/operator/map';

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

    //
    // deleteUser(id) {
    //     return this._api.delete(`users/${id}`)
    //         .map(res => res.json());
    // }

    // saveUser(user) {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     console.log(JSON.stringify(user));
    //     return this._http.post(this._globals.API_URL + '/users/add', JSON.stringify(user), {headers: headers})
    //         .map(res => res.json());
    // }

    // updateUser(todo) {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     return this._http.put('/api/v1/todo/' + todo._id, JSON.stringify(todo), {headers: headers})
    //         .map(res => res.json());
    // }
    //
}
