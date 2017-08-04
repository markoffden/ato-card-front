import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {FormService} from "../../../../services/form.service";
import {UserService} from "../../../../services/user.service";
import {User} from '../../../../models/User';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {OutletService} from "../../../../services/outlet.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'edit-outlet',
    templateUrl: 'edit-outlet.component.html'
})

export class EditOutletComponent implements OnInit {

    errorMessages;

    users: User[];

    outletId: string;

    editOutletForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _fs: FormService,
        private _os: OutletService,
        private _us: UserService,
        private _router: Router,
        private _ds: DomSanitizer, private _ar: ActivatedRoute ) {
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

        // get outlet data and patch form
        this._ar.params.subscribe(params => {
            this.outletId = params['id'];
            this._os.getOutletById(params['id']).subscribe(
                res => {
                    let outlet = res.data;
                    if (outlet.provider) {
                        this._us.getUserById(outlet.provider).subscribe(
                            data => {
                                let outletProvider = data.data;
                                outletProvider.toString = function () {
                                    return `${this.firstName} ${this.lastName}`;
                                };
                                this.editOutletForm.patchValue({
                                    provider: outletProvider
                                });
                            },
                            error => {
                                console.log(error.message);
                            }
                        );
                    }
                    this.editOutletForm.patchValue({
                        name: outlet.name || null,
                        discountType: outlet.discountType || null,
                        address: outlet.address || null,
                        longitude: outlet.longitude || null,
                        latitude: outlet.latitude || null,
                        type: outlet.type || 1
                    });
                },
                error => {
                    console.log(error.message);
                }
            );
        });

    }

    buildForm(): void {
        this.editOutletForm = this._fb.group({
            name: [null, Validators.required],
            discountType: [null, Validators.required],
            address: [null, Validators.required],
            longitude: [null],
            latitude: [null],
            type: [1],
            provider: [null, Validators.required]
        });

        this.editOutletForm.valueChanges.subscribe(data => this.onValueChanged(this.editOutletForm, data));

        this.onValueChanged(this.editOutletForm);
    }

    onValueChanged = this._fs.processErrors.bind(this);

    formErrors = {
        'name': '',
        'discountType': '',
        'address': '',
        'provider': ''
    };

    onSubmit() {
        if (this.editOutletForm.valid) {
            this.updateOutlet();
        }
    }

    updateOutlet() {
        let payload = this.editOutletForm.value;
        payload.provider = payload.provider ? payload.provider._id : null;
        this._os.updateOutlet(this.outletId, payload).subscribe(
            res => {
                console.log('Outlet is updated');
            },
            error => {
                console.log(error.message);
            }
        );
    }

    autocompleteListFormatter = (data: any) : SafeHtml => {
        let html = `<span>${data.firstName} ${data.lastName}</span>`;
        return this._ds.bypassSecurityTrustHtml(html);
    }
}
