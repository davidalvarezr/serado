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
            // console.log("GETTING CURRENT POSITION");
            this.geolocation.getCurrentPosition({timeout: 15000, maximumAge: 100000})
                .then((pos: Geoposition) => {
                    // console.log('POSITION', pos);
                    resolve(pos);
                    return;
                })
                .catch( error => {
                    console.log('ERROR', error)
                    reject('NOT_AVAILABLE');
                    return;
                });

        });
    }
}
