import {Injectable} from '@angular/core';
import {PositionWebService} from './position-web.service';
import {IPositionCrossPlatform} from './IPositionCrossPlatform';
import {Platform} from '@ionic/angular';
import {PositionMobileService} from './position-mobile.service';

@Injectable({
    providedIn: 'root'
})
export class PositionFactoryService {

    constructor(private positionWebService: PositionWebService,
                private positionMobileService: PositionMobileService,
                private platform: Platform) {
    }

    getCorrectPositionPermissionService(): IPositionCrossPlatform {
        if (!this.platform.is('cordova')) {
            return this.positionWebService;
        } else {
            return this.positionMobileService;
        }
    }
}
