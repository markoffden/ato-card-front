import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {FormService} from "../../../../services/form.service";
import {UserService} from "../../../../services/user.service";
import {User} from '../../../../models/User';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {CardService} from "../../../../services/card.service";
import {Router} from "@angular/router";

@Component({
  selector: 'add-card',
  templateUrl: 'add-card.component.html'
})

export class AddCardComponent implements OnInit {

    errorMessages;

    users: User[];

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
        private _ds: DomSanitizer) {
        this.buildForm();
    }

    ngOnInit() {

        // get error messages
        this._fs.getErrorMessages('card').subscribe(res => {
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

    addCardForm: FormGroup;

    buildForm(): void {
        this.addCardForm = this._fb.group({
            number: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
            dateIssued: [null],
            holder: [null],
            status: [1]
        });

        this.addCardForm.valueChanges.subscribe(data => this.onValueChanged(this.addCardForm, data));

        this.onValueChanged(this.addCardForm);
    }

    onValueChanged = this._fs.processErrors.bind(this);

    // setDate(): void {
    //     let date = new Date();
    //     this.addCardForm.setValue({
    //         dateIssued: {
    //             date: {
    //                 year: date.getFullYear(),
    //                 month: date.getMonth() + 1,
    //                 day: date.getDate()
    //             }
    //         }
    //     });
    // }
    //
    // clearDate(): void {
    //     this.addCardForm.setValue({dateIssued: null});
    // }

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
        payload.dateIssued = payload.dateIssued ? payload.dateIssued.jsdate : null;
        this._cs.addCard(payload).subscribe(res => {
            if (res.error) {
                console.log(res.error.message);
            } else {
                this._router.navigate(['admin/cards']);
            }
        });
    }

    autocompleteListFormatter = (data: any) : SafeHtml => {
        let html = `<span>${data.firstName} ${data.lastName}</span>`;
        return this._ds.bypassSecurityTrustHtml(html);
    }
}
