import {createFeatureSelector, createSelector} from '@ngrx/store';
import {fromLists, ListsState} from '../reducers';
import {Ad, AdsSort} from '../../models/Models';
import {AdsState} from '../reducers/lists.reducer';


export const getListsState = createFeatureSelector<ListsState>('lists');

export const getAdsState = createSelector(getListsState, fromLists.getAdsState)
export const getAdList = createSelector(getListsState, fromLists.getAdList);

export const getAdListSorted = createSelector(
    getAdsState,
    getAdList,
    (adsState: AdsState, adList: Ad[]) => {
        if (adsState.sort === AdsSort.NONE) {
            return adList;
        }

        // else sort array and return it
        const adListSorted = adList.sort((a, b) => (a.distanceFromHere - b.distanceFromHere));
        return adListSorted;
    }
);

export const getAdsLoading = createSelector(getListsState, fromLists.getAdsLoading);
export const getAdsLoaded = createSelector(getListsState, fromLists.getAdsLoaded);
export const getAdsLastSuccededLoad = createSelector(getListsState, fromLists.getAdsLastSuccededLoad);
export const getShouldShowAdSpinner = createSelector(getListsState, fromLists.getShouldShowSpinner)

