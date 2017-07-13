import {FormControl, AbstractControl} from "@angular/forms";

export class CustomValidators {

    static matchValue(matchControlName: string, matchAgainstControlName: string) {
        return (control: FormControl) => {
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
