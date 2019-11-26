import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {apiKeys} from '../../environments/api-keys';

@Injectable({
    providedIn: 'root'
})
export class ApiKeyService {

    constructor(private platform: Platform) {
    }

    getGoogleMapsApiKey() {
        if (this.platform.is('android')) {
            return apiKeys.android;
        }
        if (this.platform.is('ios')) {
            return apiKeys.ios;
        }
        return apiKeys.web;
    }
}
