import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AdService} from '../../services/ad.service';
import {Ad, AdComplete, AdNotComplete, LatLng} from '../../models/Models';
import {Store} from '@ngrx/store';
import {listsSelectors, positionSelectors} from '../../ngx-store/selectors';
import {AppState} from '../../ngx-store/reducers';
import {Coordinates} from '@ionic-native/geolocation';
import {map, switchMap} from 'rxjs/operators';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-ad-infos',
    templateUrl: './ad-infos.page.html',
    styleUrls: ['./ad-infos.page.scss'],
})
export class AdInfosPage implements OnInit {

    adId: number;
    ad: AdComplete;
    loading = false;
    adPosition: LatLng;
    currentPosition?: Coordinates;
    backButtonText: any;

    constructor(
        private store: Store<AppState>,
        private adService: AdService,
        private route: ActivatedRoute,
        private platform: Platform,
    ) {
    }

    ngOnInit() {
        this.backButtonText = this.platform.is('ios') ? 'Retour' : '';
        this.route.paramMap.pipe(
            map((params: ParamMap) => {
                this.adId = +params.get('id');
                return this.adId;
            })
        ).subscribe(
            adId => {

                this.loading = true;

                // Fetch the Ad info from API
                this.adService.getOneJob(this.adId)
                    .subscribe(
                        (ad: AdComplete) => {
                            // console.log(ad);
                            this.loading = false;
                            this.ad = ad;
                        },
                        error => {
                            console.error(error);
                            this.loading = false;
                        }
                    );

                // Find the position of the current ad and put it in this.adPosition
                this.store.select<Ad[]>(listsSelectors.getAdList).subscribe(adList => {
                    const maybeAd = adList.find(ad => ad.id === this.adId);
                    this.adPosition = maybeAd ? maybeAd.coordinates : null;
                });

                this.store.select<Coordinates>(positionSelectors.getCoordinatesState).subscribe(curPos => {
                    this.currentPosition = curPos;
                });
            }
        );
        // this.adId = parseInt(this.route.snapshot.paramMap.get('id'), 10);


        // TODO: do the same with current position
    }

}
