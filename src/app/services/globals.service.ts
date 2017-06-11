import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class Globals {
    readonly API_URL: string = environment.apiUrl;
}
