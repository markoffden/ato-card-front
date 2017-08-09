import {Injectable} from '@angular/core';
import {ModalService} from "./modal.service";

@Injectable()
export class ErrorService {

    constructor(private _ms: ModalService) {
    }

    handleErrorRes(error): void {
        let errData = JSON.parse(error._body);
        this._ms.createAlert('error', errData.message);
    }
}
