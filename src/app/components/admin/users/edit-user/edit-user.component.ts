import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../../../services/user.service";

import {CustomValidators} from "../../../../shared/custom-validators";
import {FormService} from "../../../../services/form.service";
import {ActivatedRoute} from "@angular/router";
import {ErrorService} from "../../../../services/error.service";

@Component({
    selector: 'edit-user',
    templateUrl: 'edit-user.component.html'
})

export class EditUserComponent implements OnInit, OnDestroy {

    editUserForm: FormGroup;

    errorMessages;

    userId: string;

    aliveSubscriptions: boolean;

    constructor(private _fb: FormBuilder,
                private _us: UserService,
                private _fs: FormService,
                private _ar: ActivatedRoute,
                private _es: ErrorService) {
        this.aliveSubscriptions = true;
        this.buildForm();
    }

    ngOnInit() {
        this._fs.getErrorMessages('user').takeWhile(() => this.aliveSubscriptions).subscribe(res => {
            this.errorMessages = res;
        });

        this._ar.params.takeWhile(() => this.aliveSubscriptions).subscribe(params => {
            this.userId = params['id'];
            this._us.getUserById(params['id']).takeWhile(() => this.aliveSubscriptions).subscribe(
                res => {
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
                    console.log(error.message);
                }
            );
        });
    }

    buildForm(): void {
        this.editUserForm = this._fb.group({
            firstName: [null, [Validators.required, Validators.minLength(2)]],
            lastName: [null, [Validators.required, Validators.minLength(2)]],
            gender: [true],
            email: [{value: null, disabled: true}, [Validators.email]],
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
        this._us.updateUser(this.userId, this.editUserForm.value).takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                console.log('User has been updated!');
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
