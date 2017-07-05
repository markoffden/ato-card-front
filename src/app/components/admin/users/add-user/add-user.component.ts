import {Component} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
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

    addUser(user) {
        var result: any;
        console.log(user);
        result = this._userService.saveUser(user);
        result.subscribe(x => {
            console.log(x);
        });
    }

    buildForm() {
        this.addUserForm = this._formBuilder.group({
            name: this._formBuilder.control(''),
            lastName: this._formBuilder.control(''),
            gender: this._formBuilder.control(true),
            email: this._formBuilder.control(''),
            address: this._formBuilder.control(''),
            phone: this._formBuilder.control(''),
            password: this._formBuilder.control(''),
            role: this._formBuilder.control(1),
            activated: this._formBuilder.control(false),
            avatarUrl: this._formBuilder.control('')
        });
    }
}
