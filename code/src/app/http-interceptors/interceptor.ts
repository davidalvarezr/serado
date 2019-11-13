import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable, of} from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        console.log('Inside the Http Interceptor');
        console.log('Request :');
        console.log(req);

        return of(new HttpResponse(
            { status: 200, body: {msg: 'Jean'} }
        ));

        return next.handle(req);
    }
}
