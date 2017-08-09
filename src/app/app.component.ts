import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "./services/modal.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {

    modal: any = null;

    aliveSubscriptions: boolean;

    constructor(private _ms: ModalService) {
        this.aliveSubscriptions = true;
    }

    ngOnInit() {
        this._ms.modal.takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this.modal = res;
            }
        );
    }

    ngOnDestroy() {
        this.aliveSubscriptions = false;
    }
}
