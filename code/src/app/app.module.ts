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
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        StoreModule.forRoot({ lists: fromLists.reducer, position: fromPosition.reducer}) // ngrx-store
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
        Geolocation,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
