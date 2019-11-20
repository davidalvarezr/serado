import {Injectable} from '@angular/core';
import {IPositionCrossPlatform} from './IPositionCrossPlatform';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {PositionResponse} from './PositionResponse';
import {Geoposition} from '@ionic-native/geolocation';

@Injectable({
    providedIn: 'root'
})
export class PositionWebService implements IPositionCrossPlatform {

    constructor(private geolocation: Geolocation) {
    }

    getPosition(): Promise<PositionResponse> {
        return new Promise((resolve, reject) => {

            // @ts-ignore
            navigator.permissions.query({name: 'geolocation'})
                .then((result: any) => {

                    if (result.state === 'denied') {
                        reject('NOT_GRANTED');
                        return;
                    }

                    this.geolocation.getCurrentPosition()
                        .then((pos: Geoposition) => {
                            resolve(pos);
                            return;
                        })
                        .catch( _ => {
                            reject('NOT_AVAILABLE');
                            return;
                        });
                })
                .catch( _ => {
                    reject('NOT_AVAILABLE');
                    return;
                });
        });
    }


}
