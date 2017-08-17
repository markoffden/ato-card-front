import {Component, OnInit, OnDestroy, HostBinding} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {FormService} from "../../services/form.service";
import {CustomValidators} from "../../shared/custom-validators";
import {Router} from '@angular/router';
import {ErrorService} from "../../services/error.service";

@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html'
})

export class SignUpComponent implements OnInit, OnDestroy {

    signUpForm: FormGroup;

    errorMessages;

    aliveSubscriptions: boolean;

    @HostBinding('class.page-content-wrapper') pageContentWrapper: boolean = true;

    constructor(private _api: ApiService,
                private _auth: AuthService,
                private _fb: FormBuilder,
                private _fs: FormService,
                private _router: Router,
                private _es: ErrorService) {
        this.aliveSubscriptions = true;
        this.buildForm();
    }

    ngOnInit() {
        if (this._auth.isSignedIn()) {
            this._router.navigate(['']);
        } else {
            this._fs.getErrorMessages('user').takeWhile(() => this.aliveSubscriptions).subscribe(
                res => {
                    this.errorMessages = res;
                },
                error => {
                    this._es.handleErrorRes(error);
                }
            );
        }
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

        this.signUpForm.valueChanges.takeWhile(() => this.aliveSubscriptions).subscribe(data => this.onValueChanged(this.signUpForm, data));

        this.onValueChanged(this.signUpForm);
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
        if (!this.signUpForm.valid) return;
        this.signUp();
    }

    signUp() {
        const values = this.signUpForm.value;
        this._api.post('sign-up', values).takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this._auth.setToken(res.data.token);
                this._router.navigate(['']);
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
