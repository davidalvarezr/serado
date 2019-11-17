import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Store} from '@ngrx/store';
import {AppState} from '../models/Models';
import * as fromPosition from '../ngx-store/reducers/position.reducer';
import {Position} from '../ngx-store/reducers/position.reducer';
import * as PositionActions from '../ngx-store/actions/position.actions';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';


@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private storage: Storage,
                private store: Store<AppState>,
                private geolocation: Geolocation,
                private platform: Platform,
                private androidPermissions: AndroidPermissions) {
    }

    /**
     * Store position in ngrx/store and local storage
     * @returns a promise when has finished to store position in local storage
     */
    /*setPosition(position: fromPosition.State): Promise<void> {
        this.store.dispatch(PositionActions.LOAD_POSITION({positionReducerState: position}));
        return this.storage.set('position', position);
    }*/

    /**
     * Detects the platform. If Android, will check permission and ask it according to the response
     * @returns a promise that resolves with the position or reject with an error message
     */
    askPosition(): Promise<Position> {
        return new Promise((resolve, reject) => {

            // TODO: Test on Android
            // If Android
            if (this.platform.is('android')) {

                // Check position permission
                this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
                    .then(androidPermissionResponse => {

                        // If has position permission
                        if (androidPermissionResponse.hasPermission) {
                            this.getPosition()
                                .then(pos => {
                                    resolve(pos);
                                    return;
                                })
                                .catch(err => {
                                    reject(err);
                                    return;
                                });
                        }

                        // If DO NOT have position permission, ask him
                        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
                            .then(androidPermissionAlertResponse => {
                                // If answer yes
                                if (androidPermissionAlertResponse.hasPermission) {
                                    this.getPosition()
                                        .then(pos => {
                                            resolve(pos);
                                            return;
                                        })
                                        .catch(err => {
                                            reject(err);
                                            return;
                                        });
                                }
                                // If answers no
                                reject('Pas d\'accès à la localisation');
                            })
                            .catch(err => {
                                reject(err);
                            });

                    })
                    .catch(err => {
                        reject(err);
                    });
            }

            // TODO: Find a way to check if user already has given permission
            // If not Android, tell them they will have to answer native permission asking alert
            // alert('Serado Annonces a besoin de votre localisation afin de trier les offres d\'emploi les plus proches de vous');
            return this.getPosition();

        });
    }

    /**
     * @returns a promise that resolves with position if available otherwise reject with error message
     */
    private getPosition(): Promise<Position> {
        return new Promise((resolve, reject) => {
            this.geolocation.getCurrentPosition().then((resp) => {
                const lat = resp.coords.latitude;
                const long = resp.coords.longitude;
                console.log(`You are currently at (${lat}, ${long})`);
                resolve({lat, long});
            }).catch((error) => {
                // TODO: if permission denied, save it
                console.log('Error getting location', error);
                reject('Position not available');
            });
        });
    }
}
