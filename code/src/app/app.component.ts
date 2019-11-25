import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Store} from '@ngrx/store';
import {Storage} from '@ionic/storage';
import {take} from 'rxjs/operators';
import {AppState} from './ngx-store/reducers';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    public appPages = [
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
        // this.showNgrxStateEveryXseconds(15);
    }

    initializeApp() {
        console.log("Initializing app... ------------------------------");
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            console.log("Splash screen hidden -------------------------------");
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
