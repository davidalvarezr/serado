import {Component, OnInit} from '@angular/core';
import {Ad} from '../../models/Models';
import {HttpClient} from '@angular/common/http';
import {routes} from '../../../environments/routes';

@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit {

    adList: Ad[];

    constructor(private http: HttpClient) {
        this.http.get(routes.getAds)
            .subscribe(
                (res: any) => {
                    this.adList = res;
                }
            );
    }

    ngOnInit() {
    }

}
