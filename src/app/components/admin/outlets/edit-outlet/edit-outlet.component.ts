import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {FormService} from "../../../../services/form.service";
import {UserService} from "../../../../services/user.service";
import {User} from '../../../../models/User';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {OutletService} from "../../../../services/outlet.service";
import {ActivatedRoute} from "@angular/router";
import {ErrorService} from "../../../../services/error.service";
import {CustomValidators} from "../../../../shared/custom-validators";
import {ModalService} from "../../../../services/modal.service";
declare var google;

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

    // map config
    ck = { lat: 49.441388, lng: 32.064458 };
    map: any = null;
    marker: any = null;

    constructor(
        private _fb: FormBuilder,
        private _fs: FormService,
        private _os: OutletService,
        private _us: UserService,
        private _ds: DomSanitizer,
        private _ar: ActivatedRoute,
        private _es: ErrorService,
        private _ms: ModalService) {
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

        // init map
        this.map = new google.maps.Map(document.getElementById('single-outlet-map'), {
            zoom: 13,
            center: this.ck,
            scrollwheel: false,
            disableDoubleClickZoom: true
        });

        this.map.addListener('dblclick', (e) => {
            this.placeMarker(e.latLng);
        });

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
                    if (outlet.latitude && outlet.longitude) {
                        this.marker = new google.maps.Marker({
                            position: {lat: outlet.latitude, lng: outlet.longitude},
                            map: this.map,
                            icon: `assets/images/map-marker-${outlet.type}.svg`
                        });
                        this.map.panTo({lat: outlet.latitude, lng: outlet.longitude});
                    }
                    this.editOutletForm.patchValue({
                        name: outlet.name || null,
                        discountType: outlet.discountType || null,
                        address: outlet.address || null,
                        type: outlet.type || 1
                    });
                },
                error => {
                    this._es.handleErrorRes(error);
                }
            );
        });

    }

    placeMarker(position) {
        if (this.marker) {
            this.marker.setMap(null);
        }
        this.marker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: `assets/images/map-marker-${this.editOutletForm.value.type}.svg`
        });
        this.map.panTo(position);
    }

    buildForm(): void {
        this.editOutletForm = this._fb.group({
            name: [null, CustomValidators.required()],
            discountType: [null, CustomValidators.required()],
            address: [null, CustomValidators.required()],
            type: [1],
            provider: [null]
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
        payload.latitude = this.marker ? this.marker.position.lat() : null;
        payload.longitude = this.marker ? this.marker.position.lng() : null;
        this._os.updateOutlet(this.outletId, payload).takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this._ms.createAlert('success', 'Дані про заклад оновлено');
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
