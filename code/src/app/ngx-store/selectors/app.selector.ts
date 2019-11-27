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
