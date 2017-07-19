import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {FormService} from "../../../../services/form.service";

@Component({
  selector: 'add-card',
  templateUrl: 'add-card.component.html'
})

export class AddCardComponent implements OnInit {

    errorMessages;

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

    constructor(private _fb: FormBuilder, private _fs: FormService) {
        this.buildForm();
    }

    ngOnInit() {
        this._fs.getErrorMessages('card').subscribe(res => {
            this.errorMessages = res;
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
        console.log(this.addCardForm.value);
        // var result: any;
        // console.log(user);
        // result = this._userService.saveUser(user);
        // result.subscribe(x => {
        //     console.log(x);
        // });
    }
}
