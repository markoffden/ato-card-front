import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {FormService} from "../../services/form.service";
import {CustomValidators} from "../../shared/custom-validators";
import {Router} from '@angular/router';

import {Http} from '@angular/http';

@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html'
})

export class SignUpComponent implements OnInit {

    signUpForm: FormGroup;

    errorMessages;

    constructor(private _api: ApiService,
                private _auth: AuthService,
                private _fb: FormBuilder,
                private _fs: FormService,
                private _router: Router,
                private _http: Http) {

        this.buildForm();
    }

    ngOnInit() {
        this._fs.getErrorMessages('user').subscribe(res => {
            this.errorMessages = res;
        });
    }

    buildForm(): void {
        this.signUpForm = this._fb.group({
            name: [null, [Validators.required, Validators.minLength(2)]],
            lastName: [null, [Validators.required, Validators.minLength(2)]],
            gender: [true],
            email: [null, [Validators.email]],
            address: [null],
            phone: [null],
            password: [null, [Validators.required, Validators.minLength(8)]],
            confirmPassword: [null],
            avatarUrl: [null]
        }, {
            validator: CustomValidators.matchValue('confirmPassword', 'password')
        });

        this.signUpForm.valueChanges.subscribe(data => this.onValueChanged(this.signUpForm, data));

        this.onValueChanged(this.signUpForm);
    }

    // form validation
    onValueChanged = this._fs.processErrors.bind(this);

    formErrors = {
        'name': '',
        'lastName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    };

    onSubmit() {
        if (!this.signUpForm.valid) return;
        this.signUp();
    }

    signUp() {
        const values = this.signUpForm.value;
        this._api.post('sign-up', values)
            .subscribe(data => {
                this._auth.setToken(data.data.token);
                this._router.navigate(['']);
            });
    }
}
