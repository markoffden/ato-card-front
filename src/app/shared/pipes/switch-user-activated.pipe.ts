import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'switchUserActivated'
})
export class SwitchUserActivatedPipe implements PipeTransform {

    transform(activated: number): string {
        return activated ? 'Так' : 'Ні';
    }

}
