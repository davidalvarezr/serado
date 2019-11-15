import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IHttpCrossPlatform} from './IHttpCrossPlatform';

@Injectable({
  providedIn: 'root'
})
export class HttpWebService implements IHttpCrossPlatform {
  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(url);
  }
}
