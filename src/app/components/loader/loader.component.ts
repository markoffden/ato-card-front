import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoaderService} from "../../services/loader.service";

@Component({
    selector: 'loader',
    templateUrl: 'loader.component.html'
})
export class LoaderComponent implements OnInit, OnDestroy {

    showLoader: boolean;

    aliveSubscriptions: boolean;

    constructor(private _ls: LoaderService) {
        this.aliveSubscriptions = true;
    }

    ngOnInit() {
        this._ls.showLoader.takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this.showLoader = res;
            }
        );
    }

    ngOnDestroy() {
        this.aliveSubscriptions = false;
    }
}
