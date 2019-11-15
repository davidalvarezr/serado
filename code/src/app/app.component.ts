import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppState} from './models/Models';
import {Store} from '@ngrx/store';
import {Storage} from '@ionic/storage';
import * as PositionActions from './ngx-store/actions/position.actions';
import {take} from 'rxjs/operators';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home',
        },
        {
            title: 'List',
            url: '/list',
            icon: 'list',
        },
        {
            title: 'Annonces',
            url: '/ad-list',
            icon: 'list',
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage,
        private store: Store<AppState>,
    ) {
        this.initializeApp();
        this.position_storageToStore();
        // this.showNgrxStateEveryXseconds(15);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    private position_storageToStore(): Promise<void> {
        return this.storage.get('position') // returns null if 'state' key doesn't exist
            .then(position => {
                if (position) {
                    // It will fill all reducers with the value stores in local storage
                    // this.store.dispatch(AppActions.APP_INIT(state));

                    // It will fill location reducer
                    this.store.dispatch(PositionActions.SET_POSITION(
                        // CAREFUL: do not forget labels when passing payloads
                        {positionReducerState: position}
                    ));
                }
            });
    }

    private showNgrxStateEveryXseconds(x: number) {
        setInterval(() => {
            this.store.pipe(
                take(1)
            ).subscribe(state => {
                console.log('WHOLE STATE', state);
            });
        }, x * 1000);
    }
}
