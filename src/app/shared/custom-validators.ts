import {FormGroup, AbstractControl} from "@angular/forms";

export class CustomValidators {

    static required() {
        return (control: AbstractControl): {[key: string]: any} => {
            return !control.value || control.value.trim() === '' ?
                {'required': true} : null;
        }
    }

    static minLength(num: number) {
        return (control: AbstractControl): {[key: string]: any} => {
            return control.value && control.value.trim() !== '' && control.value.trim().length < num ?
                {'minlength': true} : null;
        }
    }

    static maxLength(num: number) {
        return (control: AbstractControl): {[key: string]: any} => {
            return control.value && control.value.trim() !== '' && control.value.trim().length > num ?
                {'maxlength': true} : null;
        }
    }

    static password() {
        return (control: AbstractControl): {[key: string]: any} => {
            return control.value && control.value.trim() !== '' && !/^\S*$/.test(control.value) ?
                {'password': true} : null;
        }
    }

    static email() {
        return (control: AbstractControl): {[key: string]: any} => {
            return control.value && control.value.trim() !== '' && !control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ?
                {'email': true} : null;
        }
    }

    static matchValue(matchControlName: string, matchAgainstControlName: string) {
        return (control: FormGroup) => {
            let matchControl = control.get(matchControlName).value;
            let matchAgainstControl = control.get(matchAgainstControlName).value;
            if (matchControl !== matchAgainstControl) {
                return control.get(matchControlName).setErrors({notMatching: true});
            } else {
                return control.get(matchControlName).setErrors(null);
            }
        }
    }
}
