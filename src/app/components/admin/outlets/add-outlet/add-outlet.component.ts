import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'add-outlet',
  templateUrl: 'add-outlet.component.html'
})
export class AddOutletComponent {

    constructor(private _formBuilder: FormBuilder) {
        this.buildForm();
    }

    addOutletForm: FormGroup;

    buildForm(): void {
        this.addOutletForm = this._formBuilder.group({
            name: [null, Validators.required],
            discountType: [null, Validators.required],
            address: [null, Validators.required],
            longitude: [null],
            latitude: [null],
            type: [1],
            provider: [null, Validators.required]
        });

        this.addOutletForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.addOutletForm) { return; }
        const form = this.addOutletForm;
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

    formErrors = {
        'name': '',
        'discountType': '',
        'address': '',
        'provider': ''
    };

    errorMessages = {
        'name': {
            required: "Це поле є обов'язковим"
        },
        'discountType': {
            required: "Це поле є обов'язковим"
        },
        'address': {
            required: "Це поле є обов'язковим"
        },
        'provider': {
            required: "Це поле є обов'язковим"
        }
    };

    onSubmit() {
        if (this.addOutletForm.valid) {
            this.addOutlet();
        }
    }

    addOutlet() {
        console.log(this.addOutletForm.value);
        // var result: any;
        // console.log(user);
        // result = this._userService.saveUser(user);
        // result.subscribe(x => {
        //     console.log(x);
        // });
    }
}
