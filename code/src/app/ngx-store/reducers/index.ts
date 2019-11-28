import * as _fromLists from './lists.reducer.js';
import * as _fromPosition from './position.reducer';
import {ActionReducerMap} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export const fromLists = _fromLists;
export const fromPosition = _fromPosition;

export type ListsState = _fromLists.State;
export type PositionState = _fromPosition.State;

export interface AppState {
    router: fromRouter.RouterReducerState;
    lists: ListsState;
    position: PositionState;
}

export const reducers: ActionReducerMap<AppState> = {
    router: fromRouter.routerReducer,
    lists: _fromLists.reducer,
    position: _fromPosition.reducer,
};
