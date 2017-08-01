import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Outlet} from "../../../../../models/Outlet";

@Component({
  selector: '[outlet-list-item]',
  templateUrl: 'outlet-list-item.component.html'
})
export class OutletListItemComponent implements OnInit {

    @Input() outlet: Outlet;

    @Output() id: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    deleteOutlet(id) {
        this.id.emit(id);
    }
}
