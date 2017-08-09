import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {FormService} from "../../../../services/form.service";
import {UserService} from "../../../../services/user.service";
import {User} from '../../../../models/User';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {OutletService} from "../../../../services/outlet.service";
import {ActivatedRoute} from "@angular/router";
import {ErrorService} from "../../../../services/error.service";

@Component({
    selector: 'edit-outlet',
    templateUrl: 'edit-outlet.component.html'
})

export class EditOutletComponent implements OnInit, OnDestroy {

    errorMessages;

    users: User[];

    outletId: string;

    editOutletForm: FormGroup;

    aliveSubscriptions: boolean;

    constructor(
        private _fb: FormBuilder,
        private _fs: FormService,
        private _os: OutletService,
        private _us: UserService,
        private _ds: DomSanitizer,
        private _ar: ActivatedRoute,
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

        // get outlet data and patch form
        this._ar.params.takeWhile(() => this.aliveSubscriptions).subscribe(params => {
            this.outletId = params['id'];
            this._os.getOutletById(params['id']).takeWhile(() => this.aliveSubscriptions).subscribe(
                res => {
                    let outlet = res.data;
                    if (outlet.provider) {
                        this._us.getUserById(outlet.provider).takeWhile(() => this.aliveSubscriptions).subscribe(
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
                                this._es.handleErrorRes(error);
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
                    this._es.handleErrorRes(error);
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

        this.editOutletForm.valueChanges.takeWhile(() => this.aliveSubscriptions).subscribe(data => this.onValueChanged(this.editOutletForm, data));

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
        this._os.updateOutlet(this.outletId, payload).takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                console.log('Outlet is updated');
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
