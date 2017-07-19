import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {FormService} from "../../services/form.service";

@Component({
    selector: 'sign-in',
    templateUrl: 'sign-in.component.html'
})

export class SignInComponent implements OnInit {

    signInForm: FormGroup;

    errorMessages;

    constructor(private _fb: FormBuilder, private _us: UserService, private _fs: FormService) {
        this.buildForm();
    }

    ngOnInit() {
        this._fs.getErrorMessages('user').subscribe(res => {
            this.errorMessages = res;
        });
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
        if (this.signInForm.valid) {
            this.addUser();
        }
    }

    addUser() {
        console.log(this.signInForm.value);
        // var result: any;
        // console.log(user);
        // result = this._userService.saveUser(user);
        // result.subscribe(x => {
        //     console.log(x);
        // });
    }
}

