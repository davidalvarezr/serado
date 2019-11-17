import {Injectable} from '@angular/core';
import {IPositionCrossPlatform} from './IPositionCrossPlatform';
import {PositionResponse} from './PositionResponse';
// import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import {Geoposition} from '@ionic-native/geolocation';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class PositionMobileService implements IPositionCrossPlatform {

    constructor(private geolocation: Geolocation) {
    }

    getPosition(): Promise<PositionResponse> {
        return new Promise((resolve, reject) => {
            /*this.diagnostic.isLocationAuthorized()
                .then(isAuthorized => {
                    console.log('IS LOCATION AUTHORIZED', isAuthorized);

                    if (isAuthorized) {


                        console.log('GETTING POSITION');
                        this.geolocation.getCurrentPosition()
                            .then((pos: Geoposition) => {
                                console.log('POSITION', pos);
                                resolve(pos);
                                return;
                            })
                            .catch( _ => {
                                console.log('ERROR', _)
                                reject('NOT_AVAILABLE');
                                return;
                            });
                    } else {
                        this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE)
                            .then(status => {
                                switch (status) {
                                    case this.diagnostic.permissionStatus.NOT_REQUESTED:
                                        console.log("Permission not requested");
                                        reject("Permission not requested");
                                        return;
                                    case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                                        console.log("Permission denied");
                                        reject("Permission denied");
                                        return;
                                    case this.diagnostic.permissionStatus.GRANTED:
                                        console.log("Permission granted always");
                                    // tslint:disable-next-line:no-switch-case-fall-through
                                    case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                                        console.log("Permission granted only when in use");

                                        this.geolocation.getCurrentPosition()
                                            .then((pos: Geoposition) => {
                                                resolve(pos);
                                                return;
                                            })
                                            .catch( _ => {
                                                console.log('ERROR', _)
                                                reject('NOT_AVAILABLE');
                                                return;
                                            });
                                }
                            })
                            .catch(err => { reject(err); });
                    }
                })
                .catch(err => { reject(err); });*/

            console.log("GETTING CURRENT POSITION");
            this.geolocation.getCurrentPosition({timeout: 10000, maximumAge: 100000})
                .then((pos: Geoposition) => {
                    console.log('POSITION', pos);
                    resolve(pos);
                    return;
                })
                .catch( _ => {
                    console.log('ERROR', _)
                    reject('NOT_AVAILABLE');
                    return;

                });

        });
    }
}
