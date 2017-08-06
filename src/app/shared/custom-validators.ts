import {FormGroup, AbstractControl} from "@angular/forms";

export class CustomValidators {

    static required() {
        return (control: AbstractControl): {[key: string]: any} => {
            return !control.value || control.value.length > 1 && control.value.trim() === '' ?
                {'required': true} : null;
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
