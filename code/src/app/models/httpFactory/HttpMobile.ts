import {IHttpCrossPlatform} from './IHttpCrossPlatform';
import {Observable, from} from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpMobile implements IHttpCrossPlatform {

    constructor(private http: HTTP) {}

    get(url: string): Observable<any> {
        return from(this.http.get(url, {}, {}));
    }
}
