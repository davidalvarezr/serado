import {Action, createReducer, on} from '@ngrx/store';
import * as PositionActions from '../actions/position.actions.js';


export interface Position {
    lat: number;
    long: number;
}

export interface State {
    str: string;    // Maps API will process this string to find the GPS Location
    pos?: Position;
}


export const initialState: State = {
    str: null,
    pos: undefined,
};

const positionReducer = createReducer(
    initialState,
    on(PositionActions.SET_POSITION, (state, { str, pos }) => ({
        str,
        pos,
    })),
    on(PositionActions.RESET, state => initialState)
)

export function reducer(state: State | undefined, action: Action) {
    return positionReducer(state, action);
}
