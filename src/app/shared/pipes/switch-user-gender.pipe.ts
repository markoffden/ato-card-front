import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'switchUserGender'
})
export class SwitchUserGenderPipe implements PipeTransform {

    transform(gender: boolean): string {
        return gender ? 'Чол' : 'Жін';
    }

}
