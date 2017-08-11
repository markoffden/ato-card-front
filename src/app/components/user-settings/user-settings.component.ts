import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";

import {CustomValidators} from "../../shared/custom-validators";
import {FormService} from "../../services/form.service";
import {User} from "../../models/User";
import {ErrorService} from "../../services/error.service";
import {ModalService} from "../../services/modal.service";

@Component({
    selector: 'user-settings',
    templateUrl: 'user-settings.component.html'
})

export class UserSettingsComponent implements OnInit, OnDestroy {

    editUserForm: FormGroup;

    errorMessages;

    user: User;

    aliveSubscriptions: boolean;

    constructor(private _fb: FormBuilder,
                private _us: UserService,
                private _fs: FormService,
                private _es: ErrorService,
                private _ms: ModalService) {
        this.aliveSubscriptions = true;
        this.buildForm();
    }

    ngOnInit() {
        this._fs.getErrorMessages('user').takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this.errorMessages = res;
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );

        this._us.getCurrentUser().takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this.user = res.data;
                let user = res.data;
                this.editUserForm.setValue({
                    firstName: user.firstName || null,
                    lastName: user.lastName || null,
                    gender: user.gender && true,
                    email: user.email || null,
                    address: user.address || null,
                    phone: user.phone || null,
                    // password: user.password || null,
                    // confirmPassword: user.password || null,
                    role: user.role || 1,
                    activated: user.activated || false,
                    avatarUrl: user.avatarUrl || null
                });
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }

    buildForm(): void {
        this.editUserForm = this._fb.group({
                firstName: [null, [
                    CustomValidators.required(),
                    CustomValidators.minLength(2)
                ]],
                lastName: [null, [
                    CustomValidators.required(),
                    CustomValidators.minLength(2)
                ]],
                gender: [true],
                email: [{value: null, disabled: true}, [
                    CustomValidators.required(),
                    CustomValidators.email()
                ]],
                address: [null],
                phone: [null],
                // password: [null, [Validators.required, Validators.minLength(8)]],
                // confirmPassword: [null],
                role: [1],
                activated: [false],
                avatarUrl: [null]
            }
            // , {
            //     validator: CustomValidators.matchValue('confirmPassword', 'password')
            // }
        );

        this.editUserForm.valueChanges.takeWhile(() => this.aliveSubscriptions).subscribe(data => this.onValueChanged(this.editUserForm, data));

        this.onValueChanged(this.editUserForm);
    }

    // form validation
    onValueChanged = this._fs.processErrors.bind(this);

    formErrors = {
        'firstName': '',
        'lastName': '',
        'email': ''
        // ,
        // 'password': '',
        // 'confirmPassword': ''
    };

    onSubmit(): void {
        if (this.editUserForm.valid) {
            this.updateUser();
        }
    }

    updateUser(): void {
        let payload: Object = {};
        for (let key in this.editUserForm.value) {
            if (key !== 'email') {
                payload[key] = this.editUserForm.value[key];
            }
        }
        this._us.updateUser(this.user._id, payload).takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this._ms.createAlert('success', 'Дані про користувача оновлено');
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }

    ngOnDestroy() {
        this.aliveSubscriptions = false;
    }
}
