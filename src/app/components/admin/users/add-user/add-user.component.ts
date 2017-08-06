import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../../../services/user.service";

import {CustomValidators} from "../../../../shared/custom-validators";
import {FormService} from "../../../../services/form.service";
import {Router} from "@angular/router";

@Component({
    selector: 'add-user',
    templateUrl: 'add-user.component.html'
})

export class AddUserComponent implements OnInit {

    addUserForm: FormGroup;

    errorMessages;

    constructor(private _fb: FormBuilder,
                private _us: UserService,
                private _fs: FormService,
                private _router: Router) {
        this.buildForm();
    }

    ngOnInit() {
        this._fs.getErrorMessages('user').subscribe(res => {
            this.errorMessages = res;
        });
    }

    buildForm(): void {
        this.addUserForm = this._fb.group({
            firstName: [null, [CustomValidators.required(), Validators.minLength(2)]],
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
    onValueChanged = this._fs.processErrors.bind(this);

    formErrors = {
        'firstName': '',
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
        this._us.addUser(this.addUserForm.value).subscribe(res => {
            if (res.error) {
                console.log(res.error.message);
            } else {
                this._router.navigate(['admin/users']);
            }
        });
    }
}
