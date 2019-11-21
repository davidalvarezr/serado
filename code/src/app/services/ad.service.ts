import {Injectable} from '@angular/core';
import {HttpFactoryService} from '../models/httpFactory/http-factory.service';
import {IHttpCrossPlatform} from '../models/httpFactory/IHttpCrossPlatform';
import {Observable, of} from 'rxjs';
import {Ad, AdComplete, TitleAndDescription} from '../models/Models';
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
    getOneJob(id: number): Observable<AdComplete> {
        return this.http.get(routes.getOneAd(id))
            .pipe(
                map(json => {

                    const readableHTML = this.toReadableHTML(json);
                    const elements = this.getElementsFromHTML(readableHTML);

                    console.log(elements);

                    const adNotComplete: AdComplete = {
                        id: json.id,
                        title: this.invert_escape_html(json.title.rendered),
                        link: json.link,
                        infos: elements,
                    };

                    return adNotComplete;
                }),
            );
    }

    private toReadableHTML(json: any) {
        interface RegexAndReplacement {
            regex: RegExp;
            replacement: string;
        }
        const backslashN: RegexAndReplacement = {regex: /\\n/g, replacement: '\n'};
        const backslashT: RegexAndReplacement = {regex: /\\t/g, replacement: '  '};
        const quoteMark: RegexAndReplacement = {regex: /\\"/g, replacement: '"'};

        const regexes: RegexAndReplacement[] = [backslashN, backslashT, quoteMark];

        return regexes.reduce((previousVal, currentVal) => {
            return previousVal.replace(currentVal.regex, currentVal.replacement);
        }, json.content.rendered);
    }

    private getElementsFromHTML(htmlString: string): TitleAndDescription[] {
        const bodyElement = document.createElement('body');
        bodyElement.innerHTML = htmlString;
        const keys: any[] = Array.from(bodyElement.getElementsByClassName('ligne-item-offre-emploi-titre'));
        const values: any[] = Array.from(bodyElement.getElementsByClassName('ligne-item-offre-emploi-desc'));
        console.assert(keys.length === values.length, 'Keys and values must have the same length');
        const array: TitleAndDescription[] = [];
        for (let i = 0; i < keys.length; i++) {
            array[i] = {title: keys[i].innerHTML, description: values[i].innerHTML};
        }
        return array;
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

