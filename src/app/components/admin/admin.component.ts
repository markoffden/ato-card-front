import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {

    showSidebar: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    toggleSidebar() {
        this.showSidebar = !this.showSidebar;
    }
}
