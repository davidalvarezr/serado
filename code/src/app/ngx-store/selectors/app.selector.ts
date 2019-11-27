import {createSelector} from '@ngrx/store';
import {AdsState} from '../reducers/lists.reducer';
import {Ad, AdsSort} from '../../models/Models';
import {getAdList, getAdsState} from './lists.selector';
import {getPositionState} from './position.selector';
import {PositionState} from '../reducers';

export const shoulShowSpinner = createSelector(
    getPositionState,
    getAdsState,
    (positionState: PositionState, adsState: AdsState) => {
        return positionState.shouldShowSpinner || (adsState.shouldShowSpinner );
    }
);

export const error = createSelector(
    getPositionState,
    getAdsState,
    (positionState: PositionState, adsState: AdsState) => {
        if (adsState.error) {
            return adsState.error;
        }
        if (positionState.error) {
            return positionState.error;
        }
        return null;
    }
)


export const info = createSelector(
    getPositionState,
    getAdsState,
    (positionState: PositionState, adsState: AdsState) => {
        if (adsState.loading) {
            return 'Chargement des annonces en cours...';
        }
        if (positionState.loading) {
            return 'Localisation en cours...';
        }
        if (adsState.isFindingCoordinates) {
            return 'Recherche des coordonéées à partir des adresses...';
        }
        if (adsState.isAddingDistances) {
            return 'Calcul des distances en cours...';
        }
        return null;
    }
)
