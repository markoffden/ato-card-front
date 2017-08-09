import {Injectable, EventEmitter} from '@angular/core';
import {Subject, BehaviorSubject} from "rxjs";

@Injectable()
export class ModalService {

    modal: Subject<any> = new BehaviorSubject<any>(null);

    // confirmation actions events
    deleteUser: EventEmitter<string> = new EventEmitter<string>();
    deleteCard: EventEmitter<string> = new EventEmitter<string>();
    deleteOutlet: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    createAlert(type: string, message: string) {
        this.destroyModal();
        this.modal.next({
            type: type,
            message: message
        });
    }

    createConfirm(confirmType: string, id: string) {
        this.destroyModal();
        this.modal.next({
            type: 'confirm',
            confirmType: confirmType,
            id: id
        });
    }

    confirmAction(confirmType: string, id: string) {
        this[confirmType].emit(id);
        this.destroyModal();
    }

    destroyModal() {
        this.modal.next(null);
    }
}
