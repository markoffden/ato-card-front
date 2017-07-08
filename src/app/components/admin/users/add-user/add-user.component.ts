import {Component} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';
import {UserService} from "../../../../services/user.service";

@Component({
    selector: 'add-user',
    templateUrl: 'add-user.component.html'
})

export class AddUserComponent {

    constructor(private _formBuilder: FormBuilder, private _userService: UserService) {
        this.buildForm();
    }

    addUserForm: FormGroup;

    buildForm(): void {
        this.addUserForm = this._formBuilder.group({
            name: [null, Validators.required],
            lastName: [null, Validators.required],
            gender: [true],
            email: [null, Validators.required],
            address: [null],
            phone: [null],
            password: [null, Validators.required],
            confirmPassword: [null, Validators.required],
            role: [1],
            activated: [false],
            avatarUrl: [null]
        });

        this.addUserForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.addUserForm) { return; }
        const form = this.addUserForm;
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
        'lastName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    };

    errorMessages = {
        'name': {
            'required': "Це поле є обов'язковим"
        },
        'lastName': {
            'required': "Це поле є обов'язковим"
        },
        'email': {
            'required': "Це поле є обов'язковим"
        },
        'password': {
            'required': "Це поле є обов'язковим"
        },
        'confirmPassword': {
            'required': "Це поле є обов'язковим"
        }
    };

    addUser() {
        console.log(this.addUserForm.value);
        // var result: any;
        // console.log(user);
        // result = this._userService.saveUser(user);
        // result.subscribe(x => {
        //     console.log(x);
        // });
    }
}
