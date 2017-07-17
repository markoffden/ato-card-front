import { Component, AfterViewInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'add-card',
  templateUrl: 'add-card.component.html'
})

export class AddCardComponent implements AfterViewInit {

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

    constructor(private _formBuilder: FormBuilder) {
        this.buildForm();
    }

    addCardForm: FormGroup;

    buildForm(): void {
        this.addCardForm = this._formBuilder.group({
            number: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
            dateIssued: [null],
            holder: [null],
            status: [1]
        });

        this.addCardForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.addCardForm) { return; }
        const form = this.addCardForm;
        for (const field in this.formErrors) {

            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.errorMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    ngAfterViewInit() {

    }

    setDate(): void {
        let date = new Date();
        this.addCardForm.setValue({
            dateIssued: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            }
        });
    }

    clearDate(): void {
        this.addCardForm.setValue({dateIssued: null});
    }

    formErrors = {
        'number': ''
    };

    errorMessages = {
        'number': {
            required: "Це поле є обов'язковим",
            minlength: "Номер не може бути коротшим 2-ох символів",
            maxlength: "Номер не може бути довшим 12-ти символів"
        }
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
