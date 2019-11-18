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
    // TODO: add isSorting, sortingFinished
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
    on(ListsActions.LOAD_ADS, (state, { sort }) => ({
        ...state,
        ads: {
            ...state.ads, loading: true, loaded: false, error: null, sort
        } })),
    on(ListsActions.LOAD_ADS_SUCCESS, (state, { ads }) => ({
        ...state,
        ads: {
            ...state.ads, list: ads, loading: false, loaded: true, lastSuccessLoad: Date.now()
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

export const getAdsState = (state: State) => state.ads;
export const getAdList = (state: State) => getAdsState(state).list;
export const getAdsLoaded = (state: State) => getAdsState(state).loaded;
export const getAdsLoading = (state: State) => getAdsState(state).loading;
export const getAdsLastSuccededLoad = (state: State) => getAdsState(state).lastSuccessLoad;

export const getInfos = (state: State) => state.infos;
