import {Component, OnInit} from '@angular/core';
import {Ad, AppState} from '../../models/Models';
import {HttpClient} from '@angular/common/http';
import {routes} from '../../../environments/routes';
import { Storage } from '@ionic/storage';
import {PositionService} from '../../services/position.service';


@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit {

    adList: Ad[];

    constructor(private http: HttpClient, private positionService: PositionService,
                private storage: Storage) {

        positionService.askPosition()
            .then(pos => {
                return null;
            });

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
