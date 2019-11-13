import {IHttpCrossPlatform} from './IHttpCrossPlatform';
import {Platform} from '@ionic/angular';
import {HttpMobile} from './HttpMobile';
import {HTTP} from '@ionic-native/http/ngx';
import {HttpClient} from '@angular/common/http';
import {HttpWeb} from './HttpWeb';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HttpFactory {

    constructor(
        private platform: Platform,
        private httpMobile: HttpMobile,
        private httpWeb: HttpWeb,
    ) {}

    /**
     * Get correct HttpClass according to the platform of the user
     */
    public getCorrectHttp(): IHttpCrossPlatform {
        if (this.platform.is('cordova')) {
            console.log('Returned HTTP');
            return this.httpMobile;
        } else {
            console.log('Returned HttpClient');
            return this.httpWeb;
        }
    }
}

