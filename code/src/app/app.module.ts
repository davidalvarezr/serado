import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromLists from './ngx-store/reducers/lists.reducer.js';
import * as fromPosition from './ngx-store/reducers/position.reducer';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Interceptor} from './http-interceptors/interceptor';
import {HTTP} from '@ionic-native/http/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {EffectsModule} from '@ngrx/effects';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {PositionEffects} from './ngx-store/effects/position.effects';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import {effects} from './ngx-store/effects';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule, // HTTP (web)
        EffectsModule.forRoot([]),
        StoreModule.forRoot({ lists: fromLists.reducer, position: fromPosition.reducer}), // ngrx-store
        EffectsModule.forFeature(effects),
        StoreDevtoolsModule.instrument({
            maxAge: 100
        }),
        IonicStorageModule.forRoot({driverOrder: ['indexeddb', 'sqlite', 'websql']}), // local storage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
        HTTP, // HTTP (ionic)
        Geolocation,
        AndroidPermissions,
        Diagnostic,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
