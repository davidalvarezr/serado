import * as _fromLists from './lists.reducer.js';
import * as _fromPosition from './position.reducer';
import {ActionReducerMap} from '@ngrx/store';

export const fromLists = _fromLists;
export const fromPosition = _fromPosition;

export type ListsState = _fromLists.State;
export type PositionState = _fromPosition.State;

export interface AppState {
    lists: ListsState;
    position: PositionState;
}

export const reducers: ActionReducerMap<AppState> = {
    lists: _fromLists.reducer,
    position: _fromPosition.reducer,
}
