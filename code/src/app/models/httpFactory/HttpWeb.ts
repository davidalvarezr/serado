import {IHttpCrossPlatform} from './IHttpCrossPlatform';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpWeb implements IHttpCrossPlatform {

    constructor(private http: HttpClient) {}

    get(url: string): Observable<any> {
        return this.http.get(url);
    }

}
