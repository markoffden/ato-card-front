import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoaderService} from "../../services/loader.service";
import {BaseComponent} from "../base/base.component";

@Component({
    selector: 'loader',
    templateUrl: 'loader.component.html'
})
export class LoaderComponent extends BaseComponent implements OnInit {

    showLoader: boolean;

    constructor(private _ls: LoaderService) {
        super();
    }

    ngOnInit() {
        this._ls.showLoader.takeWhile(() => this.isAlive).subscribe(
            res => {
                this.showLoader = res;
            }
        );
    }
}
