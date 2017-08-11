import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {FormService} from "../../../../services/form.service";
import {UserService} from "../../../../services/user.service";
import {User} from '../../../../models/User';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {OutletService} from "../../../../services/outlet.service";
import {Router} from "@angular/router";
import {ErrorService} from "../../../../services/error.service";
import {CustomValidators} from "../../../../shared/custom-validators";

@Component({
  selector: 'add-outlet',
  templateUrl: 'add-outlet.component.html'
})

export class AddOutletComponent implements OnInit, OnDestroy {

    errorMessages;

    users: User[];

    aliveSubscriptions: boolean;

    addOutletForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _fs: FormService,
        private _os: OutletService,
        private _us: UserService,
        private _router: Router,
        private _ds: DomSanitizer,
        private _es: ErrorService) {
        this.users = [];
        this.aliveSubscriptions = true;
        this.buildForm();
    }

    ngOnInit() {

        // get error messages
        this._fs.getErrorMessages('outlet').takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this.errorMessages = res;
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );

        // set users list
        this._us.getUsers().takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                res.data.forEach((elem) => {
                    elem.fullName = `${elem.firstName} ${elem.lastName}`;
                    this.users.push(elem);
                });
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }

    buildForm(): void {
        this.addOutletForm = this._fb.group({
            name: [null, CustomValidators.required()],
            discountType: [null, CustomValidators.required()],
            address: [null, CustomValidators.required()],
            longitude: [null],
            latitude: [null],
            type: [1],
            provider: [null]
        });

        this.addOutletForm.valueChanges.takeWhile(() => this.aliveSubscriptions).subscribe(data => this.onValueChanged(this.addOutletForm, data));

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
        this._os.addOutlet(payload).subscribe(
            res => {
                this._router.navigate(['admin/outlets']);
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );
    }

    autocompleteListFormatter = (data: any) : SafeHtml => {
        let html = `<span>${data.firstName} ${data.lastName}</span>`;
        return this._ds.bypassSecurityTrustHtml(html);
    };

    ngOnDestroy() {
        this.aliveSubscriptions = false;
    }
}
