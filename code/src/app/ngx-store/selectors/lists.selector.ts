import {createFeatureSelector, createSelector} from '@ngrx/store';
import {fromLists, ListsState} from '../reducers';


export const getListsState = createFeatureSelector<ListsState>('lists');

export const getAdsState = createSelector(getListsState, fromLists.getAdsState)
export const getAdList = createSelector(getListsState, fromLists.getAdList);
export const getAdsLoading = createSelector(getListsState, fromLists.getAdsLoading);
export const getAdsLoaded = createSelector(getListsState, fromLists.getAdsLoaded);
export const getAdsLastSuccededLoad = createSelector(getListsState, fromLists.getAdsLastSuccededLoad);
export const getAdsIsSorting = createSelector(getListsState, fromLists.getAdsIsSorting);

