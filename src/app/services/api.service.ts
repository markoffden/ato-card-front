import {Injectable} from "@angular/core";
import {Http, Headers, Request, RequestOptions, RequestMethod, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {Globals} from './globals.service';
import {AuthService} from './auth.service';

@Injectable()
export class ApiService {

    constructor (private _globals: Globals, private _http: Http, private _auth: AuthService) {

    }

    private baseUrl = this._globals.API_URL;

    get(url: string) {
        return this.request(url, RequestMethod.Get);
    }

    post(url: string, body: Object) {
        return this.request(url, RequestMethod.Post, body);
    }

    put(url: string, body: Object) {
        return this.request(url, RequestMethod.Put, body);
    }

    delete(url: string) {
        return this.request(url, RequestMethod.Delete);
    }

    request(url: string, method: RequestMethod, body?: Object) {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${this._auth.getToken()}`);

        const requestOptions = new RequestOptions({
            url: `${this.baseUrl}/${url}`,
            method: method,
            headers: headers
        });

        if (body) {
            requestOptions.body = body;
        }

        const request = new Request(requestOptions);

        return this._http.request(request)
            .map((res: Response) => res.json());
    }
}
