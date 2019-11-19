import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Store} from '@ngrx/store';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {AppState} from '../ngx-store/reducers';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
// @ts-ignore
import maps = google.maps;
import {LatLng} from '../models/Models';
// @ts-ignore
import computeDistanceBetween = google.maps.geometry.spherical.computeDistanceBetween;

const {UnitSystem, TravelMode, DistanceMatrixService, Geocoder, LatLng, LatLngLiteral} = maps;

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    // @ts-ignore
    private distanceMatrixService: DistanceMatrixService;
    // @ts-ignore
    private geocoder: Geocoder;

    constructor(private storage: Storage,
                private store: Store<AppState>,
                private geolocation: Geolocation,
                private platform: Platform,
                private androidPermissions: AndroidPermissions) {
        this.distanceMatrixService = new DistanceMatrixService();
        this.geocoder = new Geocoder();
    }

    getDistanceBetween(origin: Coordinates, destination: string): Observable<number> {
        return new Observable<any>(subscriber => {
            this.distanceMatrixService.getDistanceMatrix(
                {
                    origins: [new LatLng(origin.latitude, origin.longitude)],
                    destinations: [destination],
                    travelMode: TravelMode.DRIVING,
                    unitSystem: UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false,
                },
                (response) => {
                    subscriber.next(response);
                    subscriber.complete();
                }
            );
        }).pipe(
            map(res => {
                const elt = res.rows[0].elements[0];
                if (elt.status !== 'NOT_FOUND') {
                    return elt.distance.value;
                } else {
                    return 999999; // Make sure that it is far away in order to appear at the end of the sorted by distance list
                }
            }),
        );
    }


    /**
     * Check if the geoloc of an ad if already stored in local storage.
     * If yes, return it.
     * If no, find it through the API, save it in local storage, and return the geoloc.
     * @param adId The id of the ad who has the adress
     * @param address The string we want the geoloc from
     */
    // @ts-ignore
    checkIfGeolocaIsStorageOrGetItFromAPI(adId: string, address: string): Observable<LatLngLiteral> {
        return new Observable<any>(subscriber => {
            // Check if the geoloc already checked the position of this ad
            this.storage.get(adId)
                .then((adGeoloc: any) => {

                    // console.log('STATE OF THE MAPPING THE FIRST TIME', adIdsMapToGeolocs);

                    if (adGeoloc === null) {
                        console.log('FETCHING FROM API WITH ID', adId);
                        this.getGeolocationFromAddress(address).subscribe(                          // Get geoloc form API,
                            latLng => {
                                this.storage.set(adId, { str: address, val: latLng });              // add it in local storage and
                                subscriber.next(latLng);                                            // complete the observable
                                subscriber.complete();
                                return;
                            }
                        );
                    } else {    // Here, the structure exists and the key as well
                        subscriber.next(adGeoloc.val);
                        subscriber.complete();
                        return;
                    }
                });
        });
    }

    distanceBetween(from: LatLng, to: LatLng): number {
        const fromFunc = {
            lat: () => from.lat,
            lng: () => from.lng,
        };
        const toFunc = {
            lat: () => to.lat,
            lng: () => to.lng,
        }
        return computeDistanceBetween(fromFunc, toFunc);
    }

    private getGeolocationFromAddress(address: string): Observable<any> {
        return new Observable(subscriber => {
            this.geocoder.geocode({
                address,
            }, (response) => {
                subscriber.next(response);
                subscriber.complete();
            });
        }).pipe(
            map((res: any) => {
                if (!res.length) {
                    return null;
                }
                return {lat: res[0].geometry.location.lat(), lng: res[0].geometry.location.lng()};
            })
        );
    }

}
