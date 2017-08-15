import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from "rxjs";

@Injectable()
export class LoaderService {

    showLoader: Subject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
    }

    toggleLoader(value: boolean) {
        this.showLoader.next(value);
    }
}
