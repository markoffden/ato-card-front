import {Component, OnInit, HostBinding} from '@angular/core';

@Component({
    selector: 'forgot-password',
    templateUrl: 'forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

    @HostBinding('class.page-content-wrapper') pageContentWrapper: boolean = true;

    constructor() {
    }

    ngOnInit() {
    }

}
