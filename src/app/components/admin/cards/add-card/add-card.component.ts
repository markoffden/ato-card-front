import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {FormService} from "../../../../services/form.service";
import {UserService} from "../../../../services/user.service";
import {User} from '../../../../models/User';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {CardService} from "../../../../services/card.service";
import {Router} from "@angular/router";
import {ErrorService} from "../../../../services/error.service";
import {CustomValidators} from "../../../../shared/custom-validators";

@Component({
  selector: 'add-card',
  templateUrl: 'add-card.component.html'
})

export class AddCardComponent implements OnInit, OnDestroy {

    errorMessages;

    users: User[];

    aliveSubscriptions: boolean;

    addCardForm: FormGroup;

    datePickerOpts: INgxMyDpOptions = {
        dayLabels: {
            su: 'Нед',
            mo: 'Пон',
            tu: 'Вів',
            we: 'Сер',
            th: 'Чет',
            fr: 'Пят',
            sa: 'Суб'
        },
        monthLabels: {
            1: 'Січ',
            2: 'Лют',
            3: 'Бер',
            4: 'Кві',
            5: 'Тра',
            6: 'Чер',
            7: 'Лип',
            8: 'Сер',
            9: 'Вер',
            10: 'Жов',
            11: 'Лис',
            12: 'Гру'
        },
        todayBtnTxt: 'Сьогодні',
        dateFormat: 'dd.mm.yyyy'
    };

    constructor(
        private _fb: FormBuilder,
        private _fs: FormService,
        private _cs: CardService,
        private _us: UserService,
        private _router: Router,
        private _ds: DomSanitizer,
        private _es: ErrorService) {
        this.aliveSubscriptions = true;
        this.users = [];
        this.buildForm();
    }

    ngOnInit() {

        // get error messages
        this._fs.getErrorMessages('card').takeWhile(() => this.aliveSubscriptions).subscribe(
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

        // patch Datepicker value with current date
        let today = new Date();
        this.addCardForm.patchValue({
            dateIssued: {
                date: {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                }
            }
        });
    }

    buildForm(): void {
        this.addCardForm = this._fb.group({
            number: [null, [
                CustomValidators.required(),
                CustomValidators.minLength(8),
                CustomValidators.maxLength(12)
            ]],
            dateIssued: [null],
            holder: [null],
            status: [1]
        });

        this.addCardForm.valueChanges.takeWhile(() => this.aliveSubscriptions).subscribe(data => this.onValueChanged(this.addCardForm, data));

        this.onValueChanged(this.addCardForm);
    }

    onValueChanged = this._fs.processErrors.bind(this);

    formErrors = {
        'number': ''
    };

    onSubmit() {
        if (this.addCardForm.valid) {
            this.addCard();
        }
    }

    addCard() {
        let payload = this.addCardForm.value;
        payload.holder = payload.holder ? payload.holder._id : null;
        payload.dateIssued = payload.dateIssued.jsdate ? payload.dateIssued.jsdate : new Date();
        this._cs.addCard(payload).takeWhile(() => this.aliveSubscriptions).subscribe(
            res => {
                this._router.navigate(['admin/cards']);
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
