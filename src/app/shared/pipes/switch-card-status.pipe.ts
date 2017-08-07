import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'switchCardStatus'
})
export class SwitchCardStatusPipe implements PipeTransform {

    transform(status: number): string {
        switch (status) {
            case 1:
            default:
                return 'Неактивна';
            case 2:
                return 'Активна / видана';
            case 3:
                return 'Загублена';
        }
    }

}
