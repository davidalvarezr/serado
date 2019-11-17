import {Injectable} from '@angular/core';
import {HTTP, HTTPResponse} from '@ionic-native/http/ngx';
import {defer, from, Observable} from 'rxjs';
import {IHttpCrossPlatform} from './IHttpCrossPlatform';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpMobileService implements IHttpCrossPlatform {

    constructor(private http: HTTP) {
    }

    get(url: string): Observable<any> {
      return from(this.http.get(url, {}, {}))
          .pipe(
              map((res: HTTPResponse) => JSON.parse(res.data)),
          );
    }
}
