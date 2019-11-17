import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import {IHttpCrossPlatform} from './IHttpCrossPlatform';
import {HttpMobileService} from './http-mobile.service';
import {HttpWebService} from './http-web.service';

@Injectable({
  providedIn: 'root'
})
export class HttpFactoryService {

  constructor(
      private platform: Platform,
      private httpMobile: HttpMobileService,
      private httpWeb: HttpWebService,
  ) {}

  /**
   * Get correct HttpClass according to the platform of the user
   */
  public getCorrectHttp(): IHttpCrossPlatform {
    if (this.platform.is('cordova')) {
      // If CORS errors with API, change to this.httpMobile
      return this.httpWeb;
    } else {
      return this.httpWeb;
    }
  }
}
