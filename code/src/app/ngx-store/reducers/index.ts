import * as fromLists from './lists.reducer.js';
import * as fromPosition from './position.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
    lists: fromLists.State;
    position: fromPosition.State;
}

export const reducers: ActionReducerMap<AppState> = {
    lists: fromLists.reducer,
    position: fromPosition.reducer,
}
