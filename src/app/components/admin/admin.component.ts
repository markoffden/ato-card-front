import {Component, OnInit, HostBinding} from '@angular/core';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {

    @HostBinding('class.global-admin-wrapper') adminWrapper: boolean = true;

    constructor() {
    }

    ngOnInit() {
    }
}
