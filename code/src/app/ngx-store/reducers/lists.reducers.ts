import {Ad, AdsSort, Info} from '../../models/Models';
import {createReducer, on} from '@ngrx/store';
import * as ListsActions from '../actions/lists.actions.js';

export interface AdsState {
    list: Ad[];
    lastLoad: number; // number of milliseconds since midnight 01 January, 1970 UTC
    sort: AdsSort;
}

export interface InfosState {
    list: Info[];
    lastLoad: number; // number of milliseconds since midnight 01 January, 1970 UTC
}

export interface ListsReducerState {
    ads: AdsState;
    infos: InfosState;
}


export const listReducerInitialState: ListsReducerState = {
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

const ListsReducer = createReducer(
    listReducerInitialState,
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
    on(ListsActions.RESET, state => listReducerInitialState)
)
