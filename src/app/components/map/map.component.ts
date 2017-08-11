import {Component, OnInit} from '@angular/core';
declare var google;

@Component({
    selector: 'map',
    templateUrl: 'map.component.html'
})
export class MapComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        const ck = {lat: 49.441388, lng: 32.064458};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: ck,
            scrollwheel: false
        });
        new google.maps.Marker({
            position: ck,
            map: map
        });
    }
}
