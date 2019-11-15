import { Injectable } from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {from, Observable} from 'rxjs';
import {IHttpCrossPlatform} from './IHttpCrossPlatform';

@Injectable({
  providedIn: 'root'
})
export class HttpMobileService implements  IHttpCrossPlatform{

  constructor(private http: HTTP) {}

  get(url: string): Observable<any> {
    return from(this.http.get(url, {}, {}));
  }
}
