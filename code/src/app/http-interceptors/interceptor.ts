import {Injectable} from '@angular/core';
import {routes} from '../../environments/routes.js';

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {fakeAdsResponse} from './fake-responses/fakeAds';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        switch (req.url) {
            case routes.getAds:
                console.log(`[GET] ${req.url}`);
                return fakeAdsResponse;
                break;
            default:
                return of(new HttpResponse({status: 404, body: `[[--> Route ${req.url} not found`}));
                break;
        }

        return next.handle(req);
    }
}
