import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ad} from '../../models/Models';
import { Storage } from '@ionic/storage';
import {PositionService} from '../../services/position.service';
import {AdService} from '../../services/ad.service';
import {Store} from '@ngrx/store';
import {AppState, PositionState} from '../../ngx-store/reducers';
import {appSelectors, listsSelectors, positionSelectors} from '../../ngx-store/selectors';
import {Observable, Subscription} from 'rxjs';
import {PositionActions} from '../../ngx-store/actions';
import {HttpClient} from '@angular/common/http';
import {AdsState} from '../../ngx-store/reducers/lists.reducer';
import {ToastComponent} from '../../components/toast/toast.component';
import {tap} from 'rxjs/operators';
import {AlertController, Platform} from '@ionic/angular';

@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('infoToast', {static: true}) infoToast: ToastComponent;
    @ViewChild('errorToast', {static: true}) errorToast: ToastComponent;

    positionState$: Observable<PositionState>;
    psSub: Subscription;
    positionState: PositionState = null;
    adsState$: Observable<AdsState>;
    asSub: Subscription;
    adsState: AdsState = null;
    adList$: Observable<Ad[]>;
    alSub: Subscription;
    adList: Ad[] = [];
    adsLastSuccededLoad: number;
    alslSub: Subscription;

    resumeSub: Subscription;

    shouldShowSpinner = true;
    sssSub: Subscription;

    constructor(private positionService: PositionService,
                private storage: Storage,
                private jobsService: AdService,
                private alertCtrl: AlertController,
                private store: Store<AppState>,
                private platform: Platform) {}

    ngOnInit() {
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
        this.resumeSub = this.platform.resume.subscribe(
          _ => {
              setTimeout(() => {
                  this.checkTimeAndLoad();

              }, 100);
          }
        );
    }

    showAlert(): Promise<void> {
        return new Promise<void>(async (resolve) => {
            const alert = await this.alertCtrl.create({
                header: 'Localisation',
                message: 'Serado Annonces a besoin de votre position afin de vous montrer les offres les plus proches de chez vous',
                buttons: [{text: 'J\'ai compris', role: 'cancel', handler: () => {
                        this.storage.set('trueIfAlreadyInit', true);
                        resolve(); return;
                    }}],
            });
            alert.present();
        });
    }

    ngAfterViewInit(): void {
        this.storage.get('trueIfAlreadyInit').then(trueIfAlreadyInit => {
            if (!trueIfAlreadyInit) {
                this.showAlert().then(() => {
                    this.initialize();
                });
            } else {
                this.initialize();
            }
        });
    }

    // Not sure if it is necessary but it is better for performances, just in case
    ngOnDestroy(): void {
        this.psSub.unsubscribe();
        this.asSub.unsubscribe();
        this.alslSub.unsubscribe();
        this.alSub.unsubscribe();
        this.resumeSub.unsubscribe();
        this.sssSub.unsubscribe();
        console.error('AdListPage destroyed');
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

    private initialize() {
        this.psSub = this.positionState$.subscribe(positionState => { this.positionState = positionState; });
        this.alSub = this.adList$.subscribe(adList => this.adList = adList);
        this.alslSub = this.store.select<number>(listsSelectors.getAdsLastSuccededLoad)
            .subscribe(
                adsLastSuccededLoad => { this.adsLastSuccededLoad = adsLastSuccededLoad; }
            );
        this.asSub = this.adsState$.subscribe(adsState => this.adsState = adsState);

        this.sssSub = this.store.select<boolean>(appSelectors.shoulShowSpinner).subscribe(
            shouldShowSpinner => {
                console.log('shouldShowSpinner:', shouldShowSpinner);
                this.shouldShowSpinner = shouldShowSpinner;
            }
        );
        this.checkTimeAndLoad();
    }

    private checkTimeAndLoad() {
        if (Date.now() - this.adsLastSuccededLoad > 10 * 1000)  { // 10 seconds
            this.store.dispatch(PositionActions.LOAD_POSITION_FOR_LIST());
        }

    }
}
