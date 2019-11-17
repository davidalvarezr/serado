import {Injectable} from '@angular/core';
import {IPositionCrossPlatform} from './IPositionCrossPlatform';
import {PositionResponse} from './PositionResponse';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';

@Injectable({
    providedIn: 'root'
})
export class PositionMobileService implements IPositionCrossPlatform {

    constructor(private diagnostic: Diagnostic) {
    }

    getPosition(): Promise<PositionResponse> {
        return new Promise((resolve, reject) => {
           /* this.diagnostic.isLocationAuthorized()
                .then(res => {
                    console.log('IS LOCATION AUTHORIZED', res);
                    reject('Implementation not finished');


                });*/

            this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE)
                .then(status => {
                    switch (status) {
                        case this.diagnostic.permissionStatus.NOT_REQUESTED:
                            console.log("Permission not requested");
                            break;
                        case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                            console.log("Permission denied");
                            break;
                        case this.diagnostic.permissionStatus.GRANTED:
                            console.log("Permission granted always");
                            break;
                        case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                            console.log("Permission granted only when in use");
                            break;
                    }
                })
                .catch(error => console.log(error));
        });
    }
}
