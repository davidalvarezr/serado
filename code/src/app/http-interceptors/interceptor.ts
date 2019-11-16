import {Injectable} from '@angular/core';
import {fakeRoutes} from '../../environments/routes.js';

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {fakeAdsResponse} from './fake-responses/fakeAds';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        console.log(`[GET] ${req.url}`);

        switch (req.url) {
            case fakeRoutes.getAds:
                return fakeAdsResponse;
            default:
                return next.handle(req);
                // return of(new HttpResponse({status: 404, body: `[[--> Route ${req.url} not found`}));
        }

    }
}
