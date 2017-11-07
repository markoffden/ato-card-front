import {Component, OnInit, HostBinding, ViewChild, ElementRef} from '@angular/core';

@Component({
    selector: 'get-card',
    templateUrl: 'get-card.component.html'
})
export class GetCardComponent implements OnInit {

    imageUploaded: string = null;

    @HostBinding('class.page-content-wrapper') pageContentWrapper: boolean = true;

    @ViewChild('uploadDocs') upload: ElementRef;

    constructor() {
    }

    ngOnInit() {
    }

    canReadFiles(): boolean {
        return !!(File && FileList && FileReader && Blob);
    }

    fileAdded() {
        if (!this.canReadFiles()) return;
        const file = this.upload.nativeElement.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            console.log(e.target.result);
            this.imageUploaded = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
