import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {User} from "../models/User";
import {ErrorService} from "./error.service";
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {

    currentUser: Subject<User> = new BehaviorSubject<User>(null);

    constructor(private _api: ApiService,
                private _es: ErrorService,
                private _auth: AuthService) {
        this.verifyCurrentUser();
    }

    verifyCurrentUser() {
        if (this._auth.isSignedIn()) {
            this.getCurrentUser().subscribe(
                res => {
                    this.setCurrentUser(res.data);
                },
                error => {
                    this._es.handleErrorRes(error);
                }
            );
        } else {
            this.setCurrentUser(null);
        }
    }

    setCurrentUser(user: User) {
        this.currentUser.next(user);
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
