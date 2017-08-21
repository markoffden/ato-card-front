import {Component, OnInit} from '@angular/core';
import {Outlet} from "../../../../models/Outlet";
import {OutletService} from "../../../../services/outlet.service";
import {ErrorService} from "../../../../services/error.service";
import {ModalService} from "../../../../services/modal.service";
import {LoaderService} from "../../../../services/loader.service";
import {BaseComponent} from "../../../base/base.component";

@Component({
  selector: 'app-outlet-list',
  templateUrl: 'outlet-list.component.html'
})
export class OutletListComponent extends BaseComponent implements OnInit {

    outlets: Outlet[];

    constructor(private _os: OutletService,
                private _ms: ModalService,
                private _es: ErrorService,
                private _ls: LoaderService) {
        super();
        this.outlets = [];
    }

    ngOnInit() {
        this._ls.turnLoaderOn();

        this._os.getOutlets().subscribe(
            res => {
                this.outlets = res.data;
            },
            error => {
                this._es.handleErrorRes(error);
            },
            () => {
                this._ls.turnLoaderOff();
            }
        );

        this._ms.deleteOutlet.takeWhile(() => this.isAlive).subscribe(
            id => {
                if (id) {
                    this.removeOutlet(id);
                }
            }
        );
    }

    removeOutlet(id) {
        this._os.deleteOutlet(id).subscribe(
            res => {
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
}
