import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Store} from '@ngrx/store';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {AppState} from '../ngx-store/reducers';
import {Observable} from 'rxjs';
// @ts-ignore
import UnitSystem = google.maps.UnitSystem;
// @ts-ignore
import TravelMode = google.maps.TravelMode;
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PositionService {

    // @ts-ignore
    private distanceMatrixService: google.maps.DistanceMatrixService;

    constructor(private storage: Storage,
                private store: Store<AppState>,
                private geolocation: Geolocation,
                private platform: Platform,
                private androidPermissions: AndroidPermissions) {
        // @ts-ignore
        this.distanceMatrixService = new google.maps.DistanceMatrixService();
    }

    getDistanceBetween(origin: Coordinates, destination: string): Observable<number> {
        return new Observable<any>(subscriber => {
            this.distanceMatrixService.getDistanceMatrix(
                {
                    // @ts-ignore
                    origins: [new google.maps.LatLng(origin.latitude, origin.longitude)],
                    destinations: [destination],
                    travelMode: TravelMode.DRIVING,
                    unitSystem: UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false,
                },
                (response) => {
                    subscriber.next(response); subscriber.complete(); }
                );
        }).pipe(
            map(res => {
                const elt =  res.rows[0].elements[0];
                if (elt.status !== 'NOT_FOUND') {
                    return elt.distance.value;
                } else {
                    return 999999; // Make sure that it is far away in order to appear at the end of the sorted by distance list
                }
            }),
        );
    }

}
