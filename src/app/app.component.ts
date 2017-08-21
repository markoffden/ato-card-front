import {Component, OnInit} from '@angular/core';
import {ModalService} from "./services/modal.service";
import {BaseComponent} from "./components/base/base.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent extends BaseComponent implements OnInit {

    private modal: any = null;

    constructor(private _ms: ModalService) {
        super();
    }

    ngOnInit() {
        this._ms.modal.takeWhile(() => this.isAlive).subscribe(
            res => {
                this.modal = res;
            }
        );
    }
}
