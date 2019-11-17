import {Action, createReducer, on} from '@ngrx/store';
import {PositionActions, AppActions} from '../actions/';
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
}


export const initialState: State = {
    hasPermission: false,
    isAvailable: false,
    coords: null,
    loading: false,
    loaded: false,
    error: null,
};

const positionReducer = createReducer(
    initialState,
    on(PositionActions.LOAD_POSITION, state => ({ ...state, loading: true })),
    on(PositionActions.LOAD_POSITION_SUCCESS, (state, { positionReducerState }) => positionReducerState),
    on(PositionActions.LOAD_POSITION_FAILURE, state => ({ ...state, loading: false, loaded: false, error: state.error })),
    // INIT and RESET
    on(AppActions.APP_INIT, (state, { wholeState }) => wholeState.position),
    on(PositionActions.RESET, state => initialState)
)

export function reducer(state: State | undefined, action: Action) {
    return positionReducer(state, action);
}

export const getPositionState = (state: State) => state;
export const getCoordinates = (state: State) => state.coords;
