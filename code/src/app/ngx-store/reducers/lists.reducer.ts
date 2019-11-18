import {Ad, AdsSort, Info} from '../../models/Models';
import {Action, createReducer, on} from '@ngrx/store';
import * as ListsActions from '../actions/lists.actions.js';
import * as AppActions from '../actions/app.actions';

export interface AdsState {
    loading: boolean;
    loaded: boolean;
    error: any;
    list: Ad[];
    lastSuccessLoad: number; // number of milliseconds since midnight 01 January, 1970 UTC
    sort: AdsSort;
}

export interface InfosState {
    list: Info[];
    lastSuccessLoad: number; // number of milliseconds since midnight 01 January, 1970 UTC
}

export interface State {
    ads: AdsState;
    infos: InfosState;
}


export const initialState: State = {
    ads: {
        loading: false,
        loaded: false,
        error: null,
        lastSuccessLoad: 0,
        list: [],
        sort: AdsSort.NONE,
    },
    infos: {
        lastSuccessLoad: 0,
        list: [],
    }
};

const listsReducer = createReducer(
    initialState,
    on(ListsActions.LOAD_ADS, (state, { sort }) => ({ ...state, ads: {...initialState.ads, loading: true, sort } })),
    on(ListsActions.LOAD_ADS_SUCCESS, (state, { ads }) => ({
        ...state,
        ads: {
            ...state.ads, list: ads, loading: false, loaded: true,
        }
    })),
    on(ListsActions.LOAD_ADS_FAILURE, (state, { error }) => ({ ...state, ads: { ...state.ads, error, loading: false  }})),
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
