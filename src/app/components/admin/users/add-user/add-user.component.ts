import {Component} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';
import {UserService} from "../../../../services/user.service";

@Component({
    selector: 'add-user',
    templateUrl: 'add-user.component.html'
})

export class AddUserComponent {

    constructor(private _formBuilder: FormBuilder, private _userService: UserService) {
        this.buildForm();
    }

    addUserForm: FormGroup;

    buildForm(): void {
        this.addUserForm = this._formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2)]],
            lastName: [null, [Validators.required, Validators.minLength(2)]],
            gender: [true],
            email: [null, Validators.required],
            address: [null],
            phone: [null],
            password: [null, [Validators.required, Validators.minLength(8)]],
            confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
            role: [1],
            activated: [false],
            avatarUrl: [null]
        });

        this.addUserForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.addUserForm) { return; }
        const form = this.addUserForm;
        for (const field in this.formErrors) {

            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.errorMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'name': '',
        'lastName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    };

    errorMessages = {
        'name': {
            required: "Це поле є обов'язковим",
            minlength: "Ім'я не може бути коротшим 2-ох літер"
        },
        'lastName': {
            required: "Це поле є обов'язковим",
            minlength: "Прізвище не може бути коротшим 2-ох літер"
        },
        'email': {
            required: "Це поле є обов'язковим"
        },
        'password': {
            required: "Це поле є обов'язковим",
            minlength: "Пароль не може бути коротшим 8-ми літер"
        },
        'confirmPassword': {
            required: "Це поле є обов'язковим",
            minlength: "Пароль не може бути коротшим 8-ми літер"
        }
    };

    onSubmit() {
        if (this.addUserForm.valid) {
            this.addUser();
        }
    }

    addUser() {
        console.log(this.addUserForm.value);
        // var result: any;
        // console.log(user);
        // result = this._userService.saveUser(user);
        // result.subscribe(x => {
        //     console.log(x);
        // });
    }
}
