import {Component, OnInit} from '@angular/core';
import {Outlet} from "../../models/Outlet";
import {OutletService} from "../../services/outlet.service";
import {ErrorService} from "../../services/error.service";
declare var google;

@Component({
    selector: 'map',
    templateUrl: 'map.component.html'
})
export class MapComponent implements OnInit {

    readonly ck = { lat: 49.441388, lng: 32.064458 };

    map: any = null;

    constructor(private _os: OutletService, private _es: ErrorService) {

    }

    ngOnInit() {
        this._os.getOutlets().subscribe(
            res => {
                this.setMarkers(res.data);
            },
            error => {
                this._es.handleErrorRes(error);
            }
        );

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: this.ck,
            scrollwheel: false
        });
    }

    setMarkers(outlets: Outlet[]) {

        let theMap = this.map;

        outlets.forEach((outlet) => {
            if (outlet.latitude && outlet.longitude) {

                let infoWindow = new google.maps.InfoWindow({
                    content: `<div class="row map-tooltip">
                                  <div class="image col-xs-3">
                                      <img src="assets/images/map-tooltip-icon-${outlet.type}.svg">
                                  </div>
                                  <div class="meta col-xs-9">
                                      <h3>${outlet.name}</h3>
                                      <p><strong>Знижка:</strong> ${outlet.discountType}</p>
                                      <p><strong>Адреса:</strong> ${outlet.address}</p>
                                  </div>
                              </div>`
                });

                let marker = new google.maps.Marker({
                    position: { lat: outlet.latitude, lng: outlet.longitude },
                    map: theMap,
                    icon: `assets/images/map-marker-${outlet.type}.svg`
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.open(theMap, marker);
                });
            }
        });
    }
}
