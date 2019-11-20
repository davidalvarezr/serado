import {Component, Input, OnInit} from '@angular/core';
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
    @Input('currentPosition') currentPosition?: Coordinates;

    private map: maps.Map;
    private markers: maps.Marker[];

    constructor() {}


    ngOnInit() {
        this.map = new maps.Map(document.getElementById('map'), {
            // ~Center of Switzerland : 46.853906, 8.245431
            center: {lat: 46.853906, lng: 8.245431},
            zoom: 10,
            disableDefaultUI: true,
        });
        this.markers = [];

        this.addMarker(this.adPosition);
        console.log('currentPosition', this.currentPosition);
        console.log('adPosition', this.adPosition);
        if (this.currentPosition !== null) {
            // const GeoMarker = new GeolocationMarker(this.map);
            this.addCurrentLocationMarker({lat: this.currentPosition.latitude, lng: this.currentPosition.longitude})
            this.addMarker({lat: 46.2037506, lng: 6.1615178});
            this.markers[this.markers.length - 1].setVisible(false);
            setTimeout(() => {
                this.boundToMarkers();
            }, 1);
        } else {
            this.map.setCenter(new maps.LatLng(this.adPosition.lat, this.adPosition.lng));
            this.map.setZoom(10);
        }


    }

    private addMarker(latLng: LatLng): maps.Marker {
        this.markers.push(new maps.Marker({position: latLng, map: this.map}));
    }

    private addCurrentLocationMarker(latLng: LatLng): maps.Marker {
        this.markers.push(new maps.Marker({
            position: latLng, map: this.map, icon: '../../assets/map/cur_loc_24.png'
        }));
    }

    private boundToMarkers() {
        const bounds = new maps.LatLngBounds();
        for (const marker of this.markers) { bounds.extend(marker.getPosition()); }
        this.map.fitBounds(bounds);
    }
}
