import {Component, OnInit} from '@angular/core';
import {Ad} from '../../models/Models';
import {HttpClient} from '@angular/common/http';
import {routes} from '../../../environments/routes';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit {

    adList: Ad[];

    constructor(private http: HttpClient, private geolocation: Geolocation, private storage: Storage) {
        this.http.get(routes.getAds)
            .subscribe(
                (res: any) => {
                    this.adList = res;
                }
            );

        this.geolocation.getCurrentPosition().then((resp) => {
            const lat = resp.coords.latitude;
            const long = resp.coords.longitude;

            console.log(`You are currently at (${lat}, ${long})`);
        }).catch((error) => {
            // TODO: if permission denied, save it
            console.log('Error getting location', error);
        });
    }

    ngOnInit() {
        // FIXME: Storing object works in the browser. Test it on cordova platform as well !
        this.storage.set('test', {msg: 'it works !'})
            .then(msg => {
                this.storage.get('test')
                    .then(elt => console.log('The element retrieved : ', elt));
            })
            .catch(err => { console.error(err); });
    }

}
