import { Component, OnInit } from '@angular/core';
import {Outlet} from "../../../../models/Outlet";
import {OutletService} from "../../../../services/outlet.service";

@Component({
  selector: 'app-outlet-list',
  templateUrl: 'outlet-list.component.html'
})
export class OutletListComponent implements OnInit {

    constructor(private _os: OutletService) {

    }

    outlets: Outlet[];

    ngOnInit() {
        this.outlets = [];
        this._os.getOutlets().subscribe(res => {
            this.outlets = res.data;
        });
    }

    removeOutlet(id) {
        let outlets = this.outlets;
        for (let i = 0; i < outlets.length; i++) {
            if (outlets[i]._id == id) {
                outlets.splice(i, 1);
            }
        }
    }
}
