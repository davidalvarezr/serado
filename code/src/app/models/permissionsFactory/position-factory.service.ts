import {Injectable} from '@angular/core';
import {PositionWebService} from './position-web.service';
import {IPositionCrossPlatform} from './IPositionCrossPlatform';

@Injectable({
    providedIn: 'root'
})
export class PositionFactoryService {

    constructor(private positionPermissionWeb: PositionWebService) {
    }

    getCorrectPositionPermissionService(): IPositionCrossPlatform {
        return this.positionPermissionWeb;
    }
}
