import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Store} from '@ngrx/store';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular';
import {AppState} from '../ngx-store/reducers';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {LatLng} from '../models/Models';
import {ApiKeyService} from './api-key.service';


@Injectable({
    providedIn: 'root'
})
export class PositionService {

    // @ts-ignore
    private distanceMatrixService;
    // @ts-ignore
    private geocoder;
    private maps;

    constructor(private storage: Storage,
                private store: Store<AppState>,
                private geolocation: Geolocation,
                private platform: Platform,
                private apiKeyService: ApiKeyService) {

        this.injectSDK()
            .then((itWorked) => {
                if (itWorked) {
                    // Here we are sure that `google` variable is available
                    // @ts-ignore
                    this.distanceMatrixService = new google.maps.DistanceMatrixService();
                    // @ts-ignore
                    this.geocoder = new google.maps.Geocoder();
                } else {
                    console.error('Injecting maps did not work...');
                }
            });

    }

    // The counter will prevent more than 10 requests/seconds to the API (otherwise the API returns OVER_QUERY_LIMIT)
    counter = 0;

    /**
     * Check if the geoloc of an ad if already stored in local storage.
     * If yes, return it.
     * If no, find it through the API, save it in local storage, and return the geoloc.
     * @param adId The id of the ad who has the adress
     * @param address The string we want the geoloc from
     */
    // @ts-ignore
    checkIfGeolocaIsStorageOrGetItFromAPI(adId: string, address: string): Observable<google.maps.LatLngLiteral> {
        return new Observable<any>(subscriber => {
            // Check if the geoloc already checked the position of this ad
            this.storage.get(adId)
                .then((adGeoloc: any) => {


                    if (adGeoloc === null) {
                        console.log('FETCHING FROM API WITH ID', adId);
                        this.getGeolocationFromAddress(address)
                                    .subscribe(                          // Get geoloc form API,
                                        latLng => {
                                            this.storage.set(adId, {str: address, val: latLng});              // add it in local storage and
                                            subscriber.next(latLng);                                            // complete the observable
                                            subscriber.complete();
                                            return;
                                        },
                                        error => {
                                            subscriber.next(null);
                                            subscriber.complete();
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

    /**
     * If an error occurs, returns a big distance so it will be sorted at the end
     * @param from
     * @param to
     */
    distanceBetween(from: LatLng, to: LatLng): number {
        let dist = 9999999;
        if (from === null || to === null) {
            return dist;
        }
        try {
            const fromFunc = {
                lat: () => from.lat,
                lng: () => from.lng,
            };
            const toFunc = {
                lat: () => to.lat,
                lng: () => to.lng,
            };

            // @ts-ignore
            dist = google.maps.geometry.spherical.computeDistanceBetween(fromFunc, toFunc);
            return dist;
        } catch (error) {
            console.error(error);
            return dist;
        }
    }

    private injectSDK(): Promise<boolean> {

        return new Promise((resolve, reject) => {

            try {
                window['initMap'] = () => {
                    resolve(true);
                };

                const script = window.document.createElement('script');
                script.id = 'googleMaps';
                const API_KEY = this.apiKeyService.getGoogleMapsApiKey();
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry&callback=initMap`;
                window.document.body.appendChild(script);
            } catch (error) {
                console.error(error);
                resolve(false);
            }
        });

    }

    private getGeolocationFromAddress(address: string): Observable<any> {
        return new Observable(subscriber => {
            try {

                this.geocoder.geocode({
                    address,
                }, (response, status) => {
                    console.error('status', status);

                    subscriber.next(response);
                    subscriber.complete();
                });
            } catch (error) {
                console.error(error);
                subscriber.error(error);
            }
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
