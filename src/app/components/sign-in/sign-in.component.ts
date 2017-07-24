import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {FormService} from "../../services/form.service";
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'sign-in',
    templateUrl: 'sign-in.component.html'
})

export class SignInComponent implements OnInit {

    signInForm: FormGroup;

    errorMessages;

    constructor(private _api: ApiService,
                private _auth: AuthService,
                private _router: Router,
                private _fb: FormBuilder,
                private _us: UserService,
                private _fs: FormService) {
        this.buildForm();
    }

    ngOnInit() {
        if (this._auth.isSignedIn()) {
            this._router.navigate(['']);
        } else {
            this._fs.getErrorMessages('user').subscribe(res => {
                this.errorMessages = res;
            });
        }
    }

    buildForm(): void {
        this.signInForm = this._fb.group({
            email: [null, [Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]]
        });

        this.signInForm.valueChanges.subscribe(data => this.onValueChanged(this.signInForm, data));

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
        this._api.post('authenticate', values)
            .subscribe(res => {
                this._auth.setToken(res.data.token);
                this._router.navigate(['']);
            });
    }
}
