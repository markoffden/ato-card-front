import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";

import {CustomValidators} from "../../shared/custom-validators";
import {FormService} from "../../services/form.service";
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../../models/User";
import {error} from "selenium-webdriver";

@Component({
    selector: 'user-settings',
    templateUrl: 'user-settings.component.html'
})

export class UserSettingsComponent implements OnInit {

    editUserForm: FormGroup;

    errorMessages;

    user: User;

    constructor(private _fb: FormBuilder,
                private _us: UserService,
                private _fs: FormService,
                private _router: Router,
                private _ar: ActivatedRoute) {
        this.buildForm();
    }

    ngOnInit() {
        this._fs.getErrorMessages('user').subscribe(res => {
            this.errorMessages = res;
        });

        this._us.getCurrentUser().subscribe(
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
                console.log(error.message);
            }
        );
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

        this.editUserForm.valueChanges.subscribe(data => this.onValueChanged(this.editUserForm, data));

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
        this._us.updateUser(this.user._id, this.editUserForm.value).subscribe(
            res => {
                console.log('User has been updated!');
            },
            error => {
                console.log(error.message);
            }
        );
    }
}
