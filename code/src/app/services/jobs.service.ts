import {Injectable} from '@angular/core';
import {HttpFactoryService} from '../models/httpFactory/http-factory.service';
import {IHttpCrossPlatform} from '../models/httpFactory/IHttpCrossPlatform';
import {Observable} from 'rxjs';
import {Ad} from '../models/Models';
import {routes} from '../../environments/routes';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class JobsService {
    private http: IHttpCrossPlatform;

    constructor(private httpFactory: HttpFactoryService) {
        this.http = httpFactory.getCorrectHttp();

    }

    getAllJobs(): Observable<Ad[]> {
        return this.http.get(routes.getAds)
            .pipe(
                map(json => this.transform(json))
            );
    }

    getOneJob(id: number): Observable<any> {
        return null;
    }

    private transform(json: any[]): Ad[] {
        return json.map((elt: any) => ({
            id: elt.id,
            title: this.invert_escape_html(elt.title.rendered),
            location: elt.fields._job_location,
            contract: '',
            beginning: '',
        }));
    }

    private invert_escape_html(str) {
        return str
            .replace(/&#8211;/g, '-')
            .replace(/&#8217;/g, '\'');
    }

}
