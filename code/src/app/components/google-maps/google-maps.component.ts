import {Component, Input, OnInit} from '@angular/core';
import {LatLng} from '../../models/Models';

@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.component.html',
    styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

    @Input('adPosition') adPosition: LatLng;
    @Input('currentPosition') currentPosition: LatLng;

    public map: any;

    constructor() {
    }

    ngOnInit() {
        // @ts-ignore
        this.map = new google.maps.Map(document.getElementById('map'), {
            // ~Center of Switzerland : 46.853906, 8.245431
            center: {lat: 46.853906, lng: 8.245431},
            zoom: 6.7
        });

        // @ts-ignore
        const adMarker = new google.maps.Marker({position: this.adPosition, map: this.map});
    }

}
