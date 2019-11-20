import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Ad} from '../../models/Models';
import { Storage } from '@ionic/storage';
import {PositionService} from '../../services/position.service';
import {AdService} from '../../services/ad.service';
import {Store} from '@ngrx/store';
import {AppState, PositionState} from '../../ngx-store/reducers';
import {listsSelectors, positionSelectors} from '../../ngx-store/selectors';
import {Observable} from 'rxjs';
import {PositionActions} from '../../ngx-store/actions';
import {HttpClient} from '@angular/common/http';
import {AdsState} from '../../ngx-store/reducers/lists.reducer';

@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit, AfterViewInit {

    positionState$: Observable<PositionState>;
    adsState$: Observable<AdsState>;
    adList$: Observable<Ad[]>;
    adsLoading$: Observable<boolean>;
    adsIsSorting$: Observable<boolean>;
    adsLastSuccededLoad: number;

    constructor(private positionService: PositionService,
                private storage: Storage,
                private jobsService: AdService,
                private store: Store<AppState>,
                private http: HttpClient) {}

    ngOnInit() {
        this.showAlertTellingWhyPositionIsNeededIfFirstTime();
        this.store.dispatch(PositionActions.LOAD_POSITION_FOR_LIST());
        // this.getAllJobs();
        this.positionState$ = this.store.select<PositionState>(positionSelectors.getPositionState);
        this.adList$ = this.store.select<Ad[]>(listsSelectors.getAdListSorted);
        this.adsLoading$ = this.store.select<boolean>(listsSelectors.getAdsLoading);
        this.store.select<number>(listsSelectors.getAdsLastSuccededLoad)
            .subscribe(
            adsLastSuccededLoad => { this.adsLastSuccededLoad = adsLastSuccededLoad; }
            );
        this.adsState$ = this.store.select<AdsState>(listsSelectors.getAdsState);
    }

    ngAfterViewInit(): void {
        if (Date.now() - this.adsLastSuccededLoad < 30 * 60 * 1000)  { // 30 minutes
            this.store.dispatch(PositionActions.LOAD_POSITION_FOR_LIST());
        } else {
            console.log('THE APP DID NOT UPDTATE THE POSITION AND THE ADS BECAUSE LAST TIME WAS LESS THAN 30 MIN');
        }

        setInterval(() => {
            console.log('time since load succeded', ((Date.now() - this.adsLastSuccededLoad) / 1000) + 's');
        }, 30 * 1000);
    }

    private async showAlertTellingWhyPositionIsNeededIfFirstTime(): Promise<void> {
        const trueIfAlreadyInit = await this.storage.get('trueIfAlreadyInit');
        if (trueIfAlreadyInit) { return; }
        const str = 'Serado Annonces a besoin de votre position afin de vous montrer les offres le splus proches de chez vous';
        alert(str);
        await this.storage.set('trueIfAlreadyInit', true);
    }

    doRefresh($event: any) {
        this.store.dispatch(PositionActions.LOAD_POSITION_FOR_LIST())
        setTimeout(() => {
            $event.detail.complete();
        }, 10);
    }
}
