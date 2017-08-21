import {Component, OnDestroy} from '@angular/core';

@Component({
    selector: 'base',
    templateUrl: 'base.component.html'
})
export class BaseComponent implements OnDestroy {

    public isAlive: boolean = null;

    constructor() {
        this.isAlive = true;
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}
