import {createFeatureSelector, createSelector} from '@ngrx/store';
import {fromPosition, PositionState} from '../reducers';


export const getPositionState = createFeatureSelector<PositionState>('position');


export const getCoordinatesState = createSelector(getPositionState, fromPosition.getCoordinates);
