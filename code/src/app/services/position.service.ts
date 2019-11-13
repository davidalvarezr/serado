import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Store} from '@ngrx/store';
import {AppState} from '../models/Models';
import * as fromPosition from '../ngx-store/reducers/position.reducer';
import * as PositionActions from '../ngx-store/actions/position.actions';

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private storage: Storage, private store: Store<AppState>) {
    }

    setPosition(position: fromPosition.State): Promise<void> {
        this.store.dispatch(PositionActions.SET_POSITION({positionReducerState: position}));
        return this.storage.set('position', position);
    }
}
