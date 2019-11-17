import {Injectable} from '@angular/core';
import {IPositionCrossPlatform} from './IPositionCrossPlatform';
import {PositionResponse} from './PositionResponse';

@Injectable({
    providedIn: 'root'
})
export class PositionMobileService implements IPositionCrossPlatform {

    constructor() {
    }

    getPosition(): Promise<PositionResponse> {
        return new Promise((resolve, reject) => {

        });
    }
}
