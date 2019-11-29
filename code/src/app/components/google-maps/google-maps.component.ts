import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {LatLng} from '../../models/Models';
// @ts-ignore
import maps = google.maps;
import {MapInitService} from '../../services/map-init.service';

@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.component.html',
    styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit, AfterViewInit {

    @Input('adPosition') adPosition: LatLng;
    @Input('currentPosition') currentPosition?: Coordinates;

    private map: maps.Map;
    private markers: maps.Marker[];

    curLocMarkerImage = {
        url: '../../assets/map/cur_loc_24.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new maps.Size(24, 24),
        // The origin for this image is (0, 0).
        origin: new maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new maps.Point(0, 24)
    };
    curLocShape = {
        coords: [0, 24, 0, 0, 24, 0, 24, 24],
        type: 'poly'
    };


    constructor(private mapInitService: MapInitService) {}


    // It seems that by default, on Android, user has to interact with the map to have it loaded


    ngOnInit() {
        if (this.adPosition) {
            this.map = new maps.Map(document.getElementById('map'), {
                // ~Center of Switzerland : 46.853906, 8.245431
                center: {lat: 46.853906, lng: 8.245431},
                zoom: 10,
                disableDefaultUI: true,
            });
        }
    }

    ngAfterViewInit(): void {
        if (this.adPosition) {
            this.markers = [];

            this.addMarker(this.adPosition);
            // console.log('currentPosition', this.currentPosition);
            // console.log('adPosition', this.adPosition);
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
    }

    private addMarker(latLng: LatLng): maps.Marker {
        this.markers.push(new maps.Marker({position: latLng, map: this.map}));
    }




    private addCurrentLocationMarker(latLng: LatLng): maps.Marker {
        /*this.markers.push(new maps.Marker({
            position: latLng, map: this.map, icon: '../../assets/map/cur_loc_32_s.png'
        }));*/
        this.markers.push(new maps.Marker({
            position: latLng,
            map: this.map,
            icon: this.curLocMarkerImage,
            shape: this.curLocShape,
        }));
    }

    private boundToMarkers() {
        const bounds = new maps.LatLngBounds();
        for (const marker of this.markers) { bounds.extend(marker.getPosition()); }
        this.map.fitBounds(bounds);
    }
}
