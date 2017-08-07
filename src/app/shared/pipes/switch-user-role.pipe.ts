import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'switchUserRole'
})
export class SwitchUserRolePipe implements PipeTransform {

    transform(role: number): string {
        switch (role) {
            case 1:
            default:
                return 'Користувач';
            case 2:
                return 'Власник карти';
            case 3:
                return 'Надавач знижки';
            case 4:
                return 'Адміністратор';
        }
    }
}
