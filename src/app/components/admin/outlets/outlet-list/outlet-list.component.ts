import {Component, OnInit, OnDestroy} from '@angular/core';
import {Outlet} from "../../../../models/Outlet";
import {OutletService} from "../../../../services/outlet.service";
import {ErrorService} from "../../../../services/error.service";
import {ModalService} from "../../../../services/modal.service";

@Component({
  selector: 'app-outlet-list',
  templateUrl: 'outlet-list.component.html'
})
export class OutletListComponent implements OnInit, OnDestroy {

    outlets: Outlet[];

    aliveSubscriptions: boolean;

    constructor(private _os: OutletService, private _ms: ModalService, private _es: ErrorService) {
        this.outlets = [];
        this.aliveSubscriptions = true;
    }

    ngOnInit() {
        this._os.getOutlets().takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this.outlets = res.data;
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );

        this._ms.deleteOutlet.takeWhile(() => this.aliveSubscriptions).subscribe(
            id => {
                if (id) {
                    this.removeOutlet(id);
                }
            }
        );
    }

    removeOutlet(id) {
        this._os.deleteOutlet(id).takeWhile(() => this.aliveSubscriptions).subscribe(
            result => {
                let outlets = this.outlets;
                for (let i = 0; i < outlets.length; i++) {
                    if (outlets[i]._id == id) {
                        outlets.splice(i, 1);
                    }
                }
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }

    ngOnDestroy() {
        this.aliveSubscriptions = false;
    }
}
