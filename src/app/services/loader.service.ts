import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from "rxjs";

@Injectable()
export class LoaderService {

    showLoader: Subject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
    }

    turnLoaderOn() {
        this.showLoader.next(true);
    }

    turnLoaderOff() {
        setTimeout(() => {
            this.showLoader.next(false);
        }, 1000);
    }
}
