import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {FormService} from "../../services/form.service";
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ErrorService} from "../../services/error.service";
import {CustomValidators} from "../../shared/custom-validators";

@Component({
    selector: 'sign-in',
    templateUrl: 'sign-in.component.html'
})

export class SignInComponent implements OnInit, OnDestroy {

    signInForm: FormGroup;

    errorMessages;

    aliveSubscriptions: boolean;

    constructor(private _api: ApiService,
                private _auth: AuthService,
                private _router: Router,
                private _fb: FormBuilder,
                private _fs: FormService,
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
        this.signInForm = this._fb.group({
            email: [null, [
                CustomValidators.required(),
                CustomValidators.email()
            ]],
            password: [null, [
                CustomValidators.required(),
                CustomValidators.minLength(8),
                CustomValidators.maxLength(12),
                CustomValidators.password(),
            ]]
        });

        this.signInForm.valueChanges.takeWhile(() => this.aliveSubscriptions).subscribe(data => this.onValueChanged(this.signInForm, data));

        this.onValueChanged(this.signInForm);
    }

    // form validation
    onValueChanged = this._fs.processErrors.bind(this);

    formErrors = {
        'email': '',
        'password': ''
    };

    onSubmit() {
        if (!this.signInForm.valid) return;
        this.signIn();
    }

    signIn() {
        const values = this.signInForm.value;
        this._api.post('authenticate', values).takeWhile(() => this.aliveSubscriptions).subscribe(
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
