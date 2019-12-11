import { Component, enableProdMode } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import { Storage } from '@ionic/storage';
import { take } from 'rxjs/operators';
import { AppState } from './ngx-store/reducers';

// enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Annonces',
      url: '/ad-list',
      icon: 'list',
    },
    {
      title: 'Partenaires',
      url: '/partners',
      icon: 'people',
    },
    {
      title: 'Informations',
      url: '/infos',
      icon: 'information-circle-outline',
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private store: Store<AppState>,
  ) {
    console.log('===== initializing app =====');
    this.initializeApp();
    // this.whenGoogleLoadedDo(this.initializeApp);
    // this.showNgrxStateEveryXseconds(15);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (cordova.platformId === 'android') {
        // this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('#33000000');
      } else {
        this.statusBar.styleDefault();
      }
      this.splashScreen.hide();
    });
  }

  private showNgrxStateEveryXseconds(x: number) {
    setInterval(() => {
      this.store.pipe(take(1)).subscribe((state) => {
        console.log('WHOLE STATE', state);
      });
    }, x * 1000);
  }
}
