import {Injectable} from '@angular/core';
import {IPositionPermissionCrossPlatform} from './IPositionPermissionCrossPlatform';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {PositionResponse} from './PositionResponse';
import {Geoposition} from '@ionic-native/geolocation';

@Injectable({
    providedIn: 'root'
})
export class PositionPermissionWebService implements IPositionPermissionCrossPlatform {

    constructor(private geolocation: Geolocation) {
    }

    getPosition(): Promise<PositionResponse> {
        return new Promise((resolve) => {

            // @ts-ignore
          navigator.permissions.query({name: 'geolocation'})
                .then((result: any) => {
                    if (result.state === 'denied') {
                        resolve('NOT_GRANTED');
                        return;
                    }

                    this.geolocation.getCurrentPosition()
                        .then((pos: Geoposition) => {
                            resolve(pos);
                            return;
                        })
                        .catch(_ => {
                            resolve('NOT_AVAILABLE');
                            return;
                        });
                });
        });
    }


}
