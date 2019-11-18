import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Store} from '@ngrx/store';
import * as fromPosition from '../ngx-store/reducers/position.reducer';
import {Position} from '../ngx-store/reducers/position.reducer';
import * as PositionActions from '../ngx-store/actions/position.actions';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {AppState} from '../ngx-store/reducers';


@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private storage: Storage,
                private store: Store<AppState>,
                private geolocation: Geolocation,
                private platform: Platform,
                private androidPermissions: AndroidPermissions) {
    }



}
