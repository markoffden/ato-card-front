import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'switchOutletType'
})
export class SwitchOutletTypePipe implements PipeTransform {

    transform(type: number): string {
        switch (type) {
            case 1:
            default:
                return 'Торгова точка';
            case 2:
                return 'Заклад харчування';
            case 3:
                return 'Сервісний центр';
            case 4:
                return 'Перукарня';
            case 5:
                return 'СТО';
        }
    }

}
