import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {FormService} from "../../../../services/form.service";
import {UserService} from "../../../../services/user.service";
import {User} from '../../../../models/User';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {OutletService} from "../../../../services/outlet.service";
import {Router} from "@angular/router";

@Component({
  selector: 'add-outlet',
  templateUrl: 'add-outlet.component.html'
})

export class AddOutletComponent implements OnInit {

    errorMessages;

    users: User[];

    constructor(
        private _fb: FormBuilder,
        private _fs: FormService,
        private _os: OutletService,
        private _us: UserService,
        private _router: Router,
        private _ds: DomSanitizer) {
        this.buildForm();
    }

    ngOnInit() {

        // get error messages
        this._fs.getErrorMessages('outlet').subscribe(res => {
            this.errorMessages = res;
        });

        // set users list
        this.users = [];
        this._us.getUsers().subscribe(res => {
            res.data.forEach((elem) => {
                elem.fullName = `${elem.firstName} ${elem.lastName}`;
                this.users.push(elem);
            });
        });
    }

    addOutletForm: FormGroup;

    buildForm(): void {
        this.addOutletForm = this._fb.group({
            name: [null, Validators.required],
            discountType: [null, Validators.required],
            address: [null, Validators.required],
            longitude: [null],
            latitude: [null],
            type: [1],
            provider: [null, Validators.required]
        });

        this.addOutletForm.valueChanges.subscribe(data => this.onValueChanged(this.addOutletForm, data));

        this.onValueChanged(this.addOutletForm);
    }

    onValueChanged = this._fs.processErrors.bind(this);

    formErrors = {
        'name': '',
        'discountType': '',
        'address': '',
        'provider': ''
    };

    onSubmit() {
        if (this.addOutletForm.valid) {
            this.addOutlet();
        }
    }

    addOutlet() {
        let payload = this.addOutletForm.value;
        payload.provider = payload.provider ? payload.provider._id : null;
        this._os.addOutlet(payload).subscribe(res => {
            if (res.error) {
                console.log(res.error.message);
            } else {
                this._router.navigate(['admin/outlets']);
            }
        });
    }

    autocompleteListFormatter = (data: any) : SafeHtml => {
        let html = `<span>${data.firstName} ${data.lastName}</span>`;
        return this._ds.bypassSecurityTrustHtml(html);
    }
}
