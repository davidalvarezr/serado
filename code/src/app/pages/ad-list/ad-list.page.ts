import {Component, OnInit} from '@angular/core';
import {Ad, AppState} from '../../models/Models';
import {HttpClient} from '@angular/common/http';
import {routes} from '../../../environments/routes';
import { Storage } from '@ionic/storage';
import {PositionService} from '../../services/position.service';
import {Position} from '../../ngx-store/reducers/position.reducer';
import {IHttpCrossPlatform} from '../../models/httpFactory/IHttpCrossPlatform';
import {HttpFactoryService} from '../../models/httpFactory/http-factory.service';


@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit {

    private http: IHttpCrossPlatform;

    adList: Ad[];

    constructor(private httpFactory: HttpFactoryService, private positionService: PositionService,
                private storage: Storage) {
        this.http = httpFactory.getCorrectHttp();

        positionService.askPosition()
            .then(pos => {
                positionService.setPosition({hasPermission: true, str: '', pos});
            })
            .catch(err => { console.error(err); });

        this.http.get(routes.getAds)
            .subscribe(
                (res: any) => {
                    this.adList = res;
                }
            );
    }

    ngOnInit() {
        // FIXME: Storing object works in the browser. Test it on cordova platform as well !
        this.storage.set('test', {msg: 'it works !'})
            .then(msg => {
                this.storage.get('jean')
                    .then(elt => console.log('The element retrieved : ', elt));
            })
            .catch(err => { console.error(err); });
    }
}
