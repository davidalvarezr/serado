import {Component, OnInit} from '@angular/core';
import {Ad} from '../../models/Models';
import {HttpClient} from '@angular/common/http';
import {routes} from '../../../environments/routes';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit {

    adList: Ad[];

    constructor(private http: HttpClient, private geolocation: Geolocation) {
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
    }

}
