import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {Globals} from './globals.service';

@Injectable()
export class UserService {
    constructor(private _http: Http, private _globals: Globals) {

    }

    getUsers() {
        return this._http.get(this._globals.API_URL + '/users').map(res => res.json());
    }

    saveUser(user) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(JSON.stringify(user));
        return this._http.post(this._globals.API_URL + '/users/add', JSON.stringify(user), {headers: headers})
            .map(res => res.json());
    }

    // updateUser(todo) {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     return this._http.put('/api/v1/todo/' + todo._id, JSON.stringify(todo), {headers: headers})
    //         .map(res => res.json());
    // }
    //
    // deleteUser(id) {
    //     return this._http.delete('/api/v1/todo/' + id)
    //         .map(res => res.json());
    // }
}
