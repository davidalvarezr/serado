import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {ToastComponent} from '../../components/toast/toast.component';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit, AfterViewInit {

    @ViewChild('infoToast', {static: true}) infoToast: ToastComponent;
    @ViewChild('errorToast', {static: true}) errorToast: ToastComponent;

    positionState$: Observable<PositionState>;
    adsState$: Observable<AdsState>;
    adList$: Observable<Ad[]>;
    adsLastSuccededLoad: number;

    constructor(private positionService: PositionService,
                private storage: Storage,
                private jobsService: AdService,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.showAlertTellingWhyPositionIsNeededIfFirstTime();
        this.store.dispatch(PositionActions.LOAD_POSITION_FOR_LIST());
        // this.getAllJobs();
        this.positionState$ = this.store.select<PositionState>(positionSelectors.getPositionState).pipe(
            tap((state) => {
                if (state.error) {
                    this.errorToast.presentToast(state.error);
                }
                if (state.loading) {
                    this.infoToast.presentToast('Localisation en cours...');
                }
            }),
        );
        this.adList$ = this.store.select<Ad[]>(listsSelectors.getAdListSorted);
        this.store.select<number>(listsSelectors.getAdsLastSuccededLoad)
            .subscribe(
            adsLastSuccededLoad => { this.adsLastSuccededLoad = adsLastSuccededLoad; }
            );
        this.adsState$ = this.store.select<AdsState>(listsSelectors.getAdsState).pipe(
            tap((state) => {
                if (state.error) {
                    this.errorToast.presentToast(state.error);
                }
                if (state.loading) {
                    this.infoToast.presentToast('Chargement des annonces en cours...');
                }
                if (state.isFindingCoordinates) {
                    this.infoToast.presentToast('Recherche des coordonéées à partir des adresses...');
                }
                if (state.isAddingDistances) {
                    this.infoToast.presentToast('Calcul des distances en cours...');
                }
            }),
        );

        // Subscribing to observers to allow piping to toasts
        this.positionState$.subscribe();
        this.adsState$.subscribe();
        this.adList$.subscribe();

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
