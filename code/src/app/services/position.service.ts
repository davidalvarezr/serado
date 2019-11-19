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

const {UnitSystem, TravelMode, DistanceMatrixService, Geocoder, LatLng, LatLngLiteral, GeocoderRequest} = maps;


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

    // @ts-ignore
    checkIfGeolocaIsStorageOrGetItFromAPI(adId: number, address: string): Observable<LatLngLiteral> {
        return new Observable<any>(subscriber => {
            // Check if the geoloc already checked the position of this ad
            this.storage.get('adIdsMapToGeolocs')
                .then(adIdsMapToGeolocs => {
                    if (adIdsMapToGeolocs == null || adIdsMapToGeolocs[adId] == null) {     // If the array structure does not exist, or
                                                                                            // exists but first time it fetched this adId,
                        const mapping = adIdsMapToGeolocs == null ? {} : adIdsMapToGeolocs; // create it
                        console.log('adIdsMapToGeolocs', adIdsMapToGeolocs);
                        this.getGeolocationFromAddress(address).subscribe(                          // Get geoloc form API,
                            latLng => {
                                this.storage.set('adIdsMapToGeolocs', {
                                    ...mapping,
                                    [adId]: { str: address, val: latLng }
                                });  // add it in local storage and
                                subscriber.next(latLng);                                            // complete the observable
                                subscriber.complete();
                                return;
                            }
                        );
                    } else {    // Here, the structure exists and the key as well
                        subscriber.next(adIdsMapToGeolocs[adId].val);
                        subscriber.complete();
                        return;
                    }
                });
        });
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
