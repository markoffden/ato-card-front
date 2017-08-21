import {Component, OnInit, HostBinding} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {FormService} from "../../services/form.service";
import {CustomValidators} from "../../shared/custom-validators";
import {Router} from '@angular/router';
import {ErrorService} from "../../services/error.service";
import {BaseComponent} from "../base/base.component";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html'
})

export class SignUpComponent extends BaseComponent implements OnInit {

    signUpForm: FormGroup;

    errorMessages;

    formErrors = {
        'firstName': '',
        'lastName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    };

    @HostBinding('class.page-content-wrapper') pageContentWrapper: boolean = true;

    constructor(private _api: ApiService,
                private _auth: AuthService,
                private _fb: FormBuilder,
                private _fs: FormService,
                private _router: Router,
                private _es: ErrorService,
                private _us: UserService) {
        super();
        this.buildForm();
    }

    ngOnInit() {
        this._fs.getErrorMessages('user').subscribe(
            res => {
                this.errorMessages = res;
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }

    buildForm(): void {
        this.signUpForm = this._fb.group({
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
                CustomValidators.password(),
                CustomValidators.minLength(8),
                CustomValidators.maxLength(12)
            ]],
            confirmPassword: [null],
            avatarUrl: [null]
        }, {
            validator: CustomValidators.matchValue('confirmPassword', 'password')
        });

        this.signUpForm.valueChanges.takeWhile(() => this.isAlive).subscribe(data => this.onValueChanged(this.signUpForm, data));

        this.onValueChanged(this.signUpForm);
    }

    // form validation
    onValueChanged = this._fs.processErrors.bind(this);

    onSubmit() {
        if (!this.signUpForm.valid) return;
        this.signUp();
    }

    signUp() {
        const values = this.signUpForm.value;
        this._api.post('sign-up', values).subscribe(
            res => {
                this._auth.setToken(res.data.token);
                this._us.setCurrentUser(res.data.user);
                this._router.navigate(['']);
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }
}
