import {Ad, AdsSort, Info} from '../../models/Models';
import {Action, createReducer, on} from '@ngrx/store';
import * as ListsActions from '../actions/lists.actions.js';
import * as AppActions from '../actions/app.actions';

export interface AdsState {
    list: Ad[];
    lastLoad: number; // number of milliseconds since midnight 01 January, 1970 UTC
    sort: AdsSort;
}

export interface InfosState {
    list: Info[];
    lastLoad: number; // number of milliseconds since midnight 01 January, 1970 UTC
}

export interface State {
    ads: AdsState;
    infos: InfosState;
}


export const initialState: State = {
    ads: {
        lastLoad: Date.now(),
        list: [],
        sort: AdsSort.DateDesc,
    },
    infos: {
        lastLoad: Date.now(),
        list: [],
    }
};

const listsReducer = createReducer(
    initialState,
    on(ListsActions.LOAD_ADS, state => state),
    on(ListsActions.LOAD_ADS_SUCCESS, state => state),
    on(ListsActions.LOAD_ADS_FAILURE, state => state),
    on(ListsActions.SORT_ADS, (state, { sort }) => ({
        ...state,
        ads: {
            ...state.ads,
            sort,
        }
    })),
    on(ListsActions.LOAD_INFOS, state => state),
    on(ListsActions.LOAD_INFOS_SUCCESS, state => state),
    on(ListsActions.LOAD_INFOS_FAILURE, state => state),
    // INIT and RESET
    on(AppActions.APP_INIT, (state, { wholeState }) => wholeState.lists),
    on(ListsActions.RESET, state => initialState)
);

export function reducer(state: State | undefined, action: Action) {
    return listsReducer(state, action);
}
