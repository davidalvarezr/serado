import {Action, createReducer, on} from '@ngrx/store';
import {PositionActions, AppActions, ListsActions} from '../actions/';
import {Coordinates} from '@ionic-native/geolocation';


export interface Position {
    lat: number;
    long: number;
}

export interface State {
    hasPermission: boolean;
    isAvailable: boolean;
    coords?: Coordinates;
    loading: boolean;
    loaded: boolean;
    error: any;
    shouldShowSpinner: boolean;
}


export const initialState: State = {
    hasPermission: false,
    isAvailable: false,
    coords: null,
    loading: false,
    loaded: false,
    error: null,
    shouldShowSpinner: false,
};

const positionReducer = createReducer(
    initialState,
    on(PositionActions.LOAD_POSITION_FOR_LIST, state => ({ ...state, loading: true, shouldShowSpinner: true })),
    on(PositionActions.LOAD_POSITION_SUCCESS, (state, { positionReducerState }) => ({...positionReducerState, shouldShowSpinner: true, })),
    on(PositionActions.LOAD_POSITION_FAILURE, (state, { error }) => ({ ...state, loading: false, loaded: false, error, })),
    on(ListsActions.LOAD_ADS, state => ({...state, shouldShowSpinner: false})),
    // INIT and RESET
    on(AppActions.APP_INIT, (state, { wholeState }) => wholeState.position),
    on(PositionActions.RESET, state => initialState)
);

export function reducer(state: State | undefined, action: Action) {
    return positionReducer(state, action);
}


export const getShouldShowSpinner = (state: State) => state.shouldShowSpinner;
export const getCoordinates = (state: State) => state.coords;

