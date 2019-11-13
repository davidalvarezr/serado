import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppState} from './models/Models';
import {Action, Store} from '@ngrx/store';
import { Storage } from '@ionic/storage';
import * as AppActions from './ngx-store/actions/app.actions';


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

        this.storageToStore();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    private storageToStore(): Promise<void> {
        return this.storage.get('state') // returns null if 'state' key doesn't exist
            .then(state => {
                if (state) {
                    // It will fill all reducers with the value stores in local storage
                    this.store.dispatch(AppActions.APP_INIT(state));
                }
            });
    }
}
