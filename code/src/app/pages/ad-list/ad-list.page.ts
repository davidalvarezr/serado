import {AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ad} from '../../models/Models';
import {Storage} from '@ionic/storage';
import {PositionService} from '../../services/position.service';
import {AdService} from '../../services/ad.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../ngx-store/reducers';
import {appSelectors, listsSelectors, routerSelectors} from '../../ngx-store/selectors';
import {Observable, of, Subscription} from 'rxjs';
import {PositionActions} from '../../ngx-store/actions';
import {ToastComponent} from '../../components/toast/toast.component';
import {AlertController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('infoToast', {static: true}) infoToast: ToastComponent;
    @ViewChild('errorToast', {static: true}) errorToast: ToastComponent;

    adList$: Observable<Ad[]>;
    lastSuccededLoad: {
        val: number,
        sub: Subscription,
    } = {
        val: 0,
        sub: null,
    };
    currentUrl: {
        val: string,
        sub: Subscription,
    } = {
        val: '/ad-list',
        sub: null,
    };
    resumeSub: Subscription;

    shouldShowSpinner$: Observable<boolean>;

    errorMsg$: Observable<any>;
    infoMsg$: Observable<string>;

    constructor(private positionService: PositionService,
                private storage: Storage,
                private jobsService: AdService,
                private alertCtrl: AlertController,
                private store: Store<AppState>,
                private platform: Platform,
                private ngZone: NgZone) {
    }

    ngOnInit() {
        this.errorMsg$ = this.store.pipe(select(appSelectors.error));
        this.infoMsg$ = this.store.pipe(select(appSelectors.info));
        this.adList$ = this.store.pipe(select(listsSelectors.getAdListSorted));
        this.shouldShowSpinner$ = this.store.pipe(select(appSelectors.shoulShowSpinner));
        this.lastSuccededLoad.sub = this.store.pipe(select(listsSelectors.getAdsLastSuccededLoad)).subscribe(
            val => this.lastSuccededLoad.val = val
        );
        this.currentUrl.sub = this.store.pipe(select(routerSelectors.currentUrl)).subscribe(
            val => this.currentUrl.val = val
        );

        // resume only happen on mobile
        // This code will assure to not trigger LOAD_POSITION more than one time, because when the app is launched for the first time, a
        // native alert is displayed which cause a resume event (and we don't want it)
        this.resumeSub = this.platform.resume.subscribe(() => {
            console.error('APP RESUMED');
            this.storage.get('trueIfAlreadyResumed')
                .then(trueIfAlreadyResumed => {
                    if (trueIfAlreadyResumed === true) {
                        // Only check the time when currently viewing this page (because this page stays alive when consulting one ad info)
                        if (this.currentUrl.val === '/ad-list') {
                            this.ngZone.run(() => {
                                this.checkTimeAndLoad();
                            });
                        }
                    }
                    this.storage.set('trueIfAlreadyResumed', true);
                });
            // alert('current page :' + this.currentUrl.val);
        });


        // TODO: unsubscribe
        this.errorMsg$.subscribe(
            errorMsg => {
                if (errorMsg !== null) {
                    this.errorToast.presentToast(errorMsg);
                }
            }
        );
        this.infoMsg$.subscribe(
            infoMsg => {
                if (infoMsg !== null) {
                    this.infoToast.presentToast(infoMsg);
                }
            }
        );
    }

    showAlert(): Promise<void> {
        return new Promise<void>(async (resolve) => {
            const alert = await this.alertCtrl.create({
                header: 'Localisation',
                message: 'Serado Annonces a besoin de votre position afin de vous montrer les offres les plus proches de chez vous',
                buttons: [{
                    text: 'J\'ai compris', role: 'cancel', handler: () => {
                        this.storage.set('trueIfAlreadyInit', true);
                        resolve();
                        return;
                    }
                }],
            });
            alert.present();
        });
    }

    ngAfterViewInit(): void {
        this.storage.get('trueIfAlreadyInit').then(trueIfAlreadyInit => {
            if (!trueIfAlreadyInit) {
                this.showAlert().then(() => {
                    this.checkTimeAndLoad();
                });
            } else {
                this.checkTimeAndLoad();
            }
        });
    }

    // Not sure if it is necessary but it is better for performances, just in case
    ngOnDestroy(): void {
        this.resumeSub.unsubscribe();
        this.lastSuccededLoad.sub.unsubscribe();
        this.currentUrl.sub.unsubscribe();
        console.error('AdListPage destroyed');
    }

    doRefresh($event: any) {
        console.log('Calling LOAD_POSITION_FOR_LIST since doRefresh');
        this.store.dispatch(PositionActions.LOAD_POSITION_FOR_LIST());
        setTimeout(() => {
            $event.detail.complete();
        }, 10);
    }

    private checkTimeAndLoad() {
        if (Date.now() - this.lastSuccededLoad.val > 30 * 60 * 1000) { // 30 min
            // console.log('Calling LOAD_POSITION_FOR_LIST since checkTimeAndLoad');
            of(this.store.dispatch(PositionActions.LOAD_POSITION_FOR_LIST()))
                .pipe(debounceTime(5000))
                .subscribe(
                    _ => {},
                    error => console.error(error),
                );
        }
    }
}
