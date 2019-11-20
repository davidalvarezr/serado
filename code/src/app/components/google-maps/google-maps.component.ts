import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LatLng} from '../../models/Models';
// @ts-ignore
import maps = google.maps;

@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.component.html',
    styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

    @Input('adPosition') adPosition: LatLng;
    @Input('currentPosition') currentPosition: Coordinates;

    private map: maps.Map;
    private markers: maps.Marker[];

    constructor() {}


    ngOnInit() {
        this.map = new maps.Map(document.getElementById('map'), {
            // ~Center of Switzerland : 46.853906, 8.245431
            // center: {lat: 46.853906, lng: 8.245431},
            // zoom: 6.7
        });
        this.markers = [];

        this.addMarker(this.adPosition);
        this.addMarker({lat: 46.2037506, lng: 6.1615178});

        this.boundToMarkers();
    }

    private addMarker(latLng: LatLng): maps.Marker {
        this.markers.push(new maps.Marker({position: latLng, map: this.map}));
    }

    private boundToMarkers() {
        const bounds = new maps.LatLngBounds();
        for (const marker of this.markers) { bounds.extend(marker.getPosition()); }
        this.map.fitBounds(bounds);
    }
}
