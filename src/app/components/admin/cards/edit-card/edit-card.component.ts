import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {FormService} from "../../../../services/form.service";
import {UserService} from "../../../../services/user.service";
import {User} from '../../../../models/User';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {CardService} from "../../../../services/card.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'edit-card',
    templateUrl: 'edit-card.component.html'
})

export class EditCardComponent implements OnInit {

    errorMessages;

    users: User[];

    private cardId: string;

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
        private _ar: ActivatedRoute) {
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

        // get card and set all form values
        this._ar.params.subscribe(params => {
            this.cardId = params['id'];
            this._cs.getCardById(params['id']).subscribe(
                res => {
                    let card = res.data;
                    if (card.dateIssued) {
                        let date = new Date(card.dateIssued);
                        this.editCardForm.patchValue({
                            dateIssued: {
                                date: {
                                    year: date.getFullYear(),
                                    month: date.getMonth() + 1,
                                    day: date.getDate()
                                }
                            }
                        });
                    }
                    if (card.holder) {
                        this._us.getUserById(card.holder).subscribe(
                            data => {
                                let cardHolder = data.data;
                                cardHolder.toString = function () {
                                    return `${this.firstName} ${this.lastName}`;
                                };
                                this.editCardForm.patchValue({
                                    holder: cardHolder
                                });
                            },
                            error => {
                                console.log(error.message);
                            }
                        );
                    }
                    this.editCardForm.patchValue({
                        number: card.number || null,
                        status: card.status || 1
                    });
                },
                error => {
                    console.log(error.message);
                }
            );
        });
    }

    editCardForm: FormGroup;

    buildForm(): void {
        this.editCardForm = this._fb.group({
            number: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
            dateIssued: [null],
            holder: [null],
            status: [1]
        });

        this.editCardForm.valueChanges.subscribe(data => this.onValueChanged(this.editCardForm, data));

        this.onValueChanged(this.editCardForm);
    }

    onValueChanged = this._fs.processErrors.bind(this);

    formErrors = {
        'number': ''
    };

    onSubmit() {
        if (this.editCardForm.valid) {
            this.updateCard();
        }
    }

    updateCard() {
        let payload = this.editCardForm.value;
        payload.holder = payload.holder ? payload.holder._id : null;
        payload.dateIssued = payload.dateIssued ? payload.dateIssued.jsdate : null;
        this._cs.updateCard(this.cardId, payload).subscribe(
            res => {
                console.log('Card is updated');
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
