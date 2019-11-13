import {Observable} from 'rxjs';

export interface IHttpCrossPlatform {
    get(url: string): Observable<any>;
}


