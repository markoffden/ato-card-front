import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Http} from '@angular/http';

@Injectable()
export class FormService {

    constructor (private _http: Http) {

    }

    private formErrors;

    private errorMessages;

    getErrorMessages(slug) {
        return this._http.get('data/form-error-messages.json').map(res => res.json()[slug]);
    }

    processErrors(form: FormGroup, data?: any) {

        if (!form) { return; }
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.errorMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }

        }
    }
}
