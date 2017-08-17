import {Component, OnInit, HostBinding} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    @HostBinding('class.page-content-wrapper') pageContentWrapper: boolean = true;

    constructor() {
    }

    ngOnInit() {
    }

}
