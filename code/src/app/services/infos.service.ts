import {Injectable} from '@angular/core';
import {IHttpCrossPlatform} from '../models/httpFactory/IHttpCrossPlatform';
import {HttpFactoryService} from '../models/httpFactory/http-factory.service';
import {Observable, of} from 'rxjs';
import {routes} from '../../environments/routes';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TitleAndDescription} from '../models/Models';

@Injectable({
    providedIn: 'root'
})
export class InfosService {

    // The HTML containing all the infos
    infos: string;
    http: IHttpCrossPlatform;

    constructor(private httpFactory: HttpFactoryService, private httpClient: HttpClient) {
        this.http = this.httpFactory.getCorrectHttp();
    }

    getInfos(): Observable<any> {
        return this.httpClient.get(routes.proxy + routes.infos)
            .pipe(
                catchError(error => of(error.error.text)
                    .pipe(
                        map(htmlString => this.getElementsFromHTML(htmlString))
                    )
                ),
            );
    }


    private getElementsFromHTML(htmlString: string): TitleAndDescription[] {
        const bodyElement = document.createElement('body');
        bodyElement.innerHTML = htmlString;
        const elt: any[] = Array.from(bodyElement.getElementsByClassName('post-content'));
        return elt[0].innerHTML;
    }

}
