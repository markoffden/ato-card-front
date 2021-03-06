import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {UserService} from "../../../../services/user.service";

import {CustomValidators} from "../../../../shared/custom-validators";
import {FormService} from "../../../../services/form.service";
import {Router} from "@angular/router";
import {ErrorService} from "../../../../services/error.service";

@Component({
    selector: 'add-user',
    templateUrl: 'add-user.component.html'
})

export class AddUserComponent implements OnInit, OnDestroy {

    addUserForm: FormGroup;

    errorMessages;

    aliveSubsciptions: boolean;

    constructor(private _fb: FormBuilder,
                private _us: UserService,
                private _fs: FormService,
                private _router: Router,
                private _es: ErrorService) {
        this.aliveSubsciptions = true;
        this.buildForm();
    }

    ngOnInit() {
        this._fs.getErrorMessages('user').takeWhile(() => this.aliveSubsciptions).subscribe(
            res => {
                this.errorMessages = res;
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }

    buildForm(): void {
        this.addUserForm = this._fb.group({
            firstName: [null, [
                CustomValidators.required(),
                CustomValidators.minLength(2)
            ]],
            lastName: [null, [
                CustomValidators.required(),
                CustomValidators.minLength(2)
            ]],
            gender: [true],
            email: [null, [
                CustomValidators.required(),
                CustomValidators.email()
            ]],
            address: [null],
            phone: [null],
            password: [null, [
                CustomValidators.required(),
                CustomValidators.minLength(8),
                CustomValidators.maxLength(12),
                CustomValidators.password()
            ]],
            confirmPassword: [null],
            role: [1],
            activated: [false],
            avatarUrl: [null]
        }, {
            validator: CustomValidators.matchValue('confirmPassword', 'password')
        });

        this.addUserForm.valueChanges.takeWhile(() => this.aliveSubsciptions).subscribe(data => this.onValueChanged(this.addUserForm, data));

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
        this._us.addUser(this.addUserForm.value).takeWhile(() => this.aliveSubsciptions).subscribe(
            res => {
                this._router.navigate(['admin/users']);
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }

    ngOnDestroy() {
        this.aliveSubsciptions = false;
    }
}
