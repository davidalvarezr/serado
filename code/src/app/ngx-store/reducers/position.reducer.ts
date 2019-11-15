import {Action, createReducer, on} from '@ngrx/store';
import * as PositionActions from '../actions/position.actions.js';
import * as AppActions from '../actions/app.actions';


export interface Position {
    lat: number;
    long: number;
}

export interface State {
    hasPermission: boolean;
    str: string;    // Maps API will process this string to find the GPS Location
    pos?: Position;
}


export const initialState: State = {
    hasPermission: false,
    str: null,
    pos: undefined,
};

const positionReducer = createReducer(
    initialState,
    on(PositionActions.SET_POSITION, (state, { positionReducerState }) => positionReducerState),
    // INIT and RESET
    on(AppActions.APP_INIT, (state, { wholeState }) => wholeState.position),
    on(PositionActions.RESET, state => initialState)
)

export function reducer(state: State | undefined, action: Action) {
    return positionReducer(state, action);
}
