import {Injectable} from '@angular/core';
import {HttpFactoryService} from '../models/httpFactory/http-factory.service';
import {IHttpCrossPlatform} from '../models/httpFactory/IHttpCrossPlatform';
import {Observable, of} from 'rxjs';
import {Ad, AdNotComplete} from '../models/Models';
import {routes} from '../../environments/routes';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdService {
    private http: IHttpCrossPlatform;

    constructor(private httpFactory: HttpFactoryService) {
        this.http = httpFactory.getCorrectHttp();

    }

    getAllJobs(): Observable<Ad[]> {
        return this.http.get(routes.getAds)
            .pipe(
                map(json => this.transform(json)),
                catchError(() => of([]))
            );
    }

    // TODO: change to AdComplete when HTML is parsed
    getOneJob(id: number): Observable<AdNotComplete> {
        return this.http.get(routes.getOneAd(id))
            .pipe(
                map(json => {
                    const adNotComplete: AdNotComplete = {
                        id: json.id,
                        title: this.invert_escape_html(json.title.rendered),
                        link: json.link,
                    };

                    return adNotComplete;
                }),
            );
    }

    private transform(json: any[]): Ad[] {
        return json.map((elt: any) => ({
            id: elt.id,
            title: this.invert_escape_html(elt.title.rendered),
            location: elt.fields._job_location,
            contract: '',
            beginning: '',
            coordinates: null,
        }));
    }

    private invert_escape_html(str) {
        return str
            .replace(/&#8211;/g, '-')
            .replace(/&#8217;/g, '\'');
    }

}
