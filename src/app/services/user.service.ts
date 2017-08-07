import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from "rxjs";

@Injectable()
export class UserService {
    constructor(private _api: ApiService) {

    }

    getUsers(): Observable<any> {
        return this._api.get('users');
    }

    getCurrentUser(): Observable<any> {
        return this._api.get('user');
    }

    getUserById(id): Observable<any> {
        return this._api.get(`users/${id}`);
    }

    addUser(user): Observable<any> {
        return this._api.post('users', user);
    }

    updateUser(id, user): Observable<any> {
        return this._api.patch(`users/${id}`, user);
    }

    deleteUser(id): Observable<any> {
        return this._api.delete(`users/${id}`);
    }
}
