import {Component, OnInit, Input} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html'
})
export class ModalComponent implements OnInit {

    @Input() private modal: any = null;

    constructor(private _ms: ModalService) {

    }

    ngOnInit() {
    }

    confirmAction(confirmType: string, id: string) {
        this._ms.confirmAction(confirmType, id);
    }

    destroyModal() {
        this._ms.destroyModal();
    }
}
