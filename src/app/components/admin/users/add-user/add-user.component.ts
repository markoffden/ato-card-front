import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../../../services/user.service";

import {CustomValidators} from "../../../../shared/custom-validators";
import {FormsService} from "../../../../services/forms.service";

@Component({
    selector: 'add-user',
    templateUrl: 'add-user.component.html'
})

export class AddUserComponent implements OnInit {

    addUserForm: FormGroup;

    errorMessages;

    constructor(private _formBuilder: FormBuilder, private _userService: UserService, private _formsService: FormsService) {
        this.buildForm();
    }

    ngOnInit() {
        this._formsService.getErrorMessages('user').subscribe(res => {
            this.errorMessages = res;
        });
    }

    buildForm(): void {
        this.addUserForm = this._formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2)]],
            lastName: [null, [Validators.required, Validators.minLength(2)]],
            gender: [true],
            email: [null, [Validators.email]],
            address: [null],
            phone: [null],
            password: [null, [Validators.required, Validators.minLength(8)]],
            confirmPassword: [null],
            role: [1],
            activated: [false],
            avatarUrl: [null]
        }, {
            validator: CustomValidators.matchValue('confirmPassword', 'password')
        });

        this.addUserForm.valueChanges.subscribe(data => this.onValueChanged(this.addUserForm, data));

        this.onValueChanged(this.addUserForm);
    }

    // form validation
    onValueChanged = this._formsService.processErrors.bind(this);

    formErrors = {
        'name': '',
        'lastName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    };

    onSubmit() {
        if (this.addUserForm.valid) {
            this.addUser();
        }
    }

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
