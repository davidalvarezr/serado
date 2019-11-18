import {Action, createAction, props} from '@ngrx/store';
import * as fromPosition from '../reducers/position.reducer';


export const LOAD_POSITION_FOR_LIST = createAction(
    '[POSITION] LOAD POSITION FOR LIST'
);

export const LOAD_POSITION_FOR_MAP = createAction(
    '[POSITION] LOAD POSITION FOR MAP'
);

export const LOAD_POSITION_SUCCESS = createAction(
    '[POSITION] LOAD POSITION SUCCESS',
    props<{positionReducerState: fromPosition.State}>()
);

export const LOAD_POSITION_FAILURE = createAction(
    '[POSITION] LOAD POSITION FAILURE',
    props<{error: any}>()
);

export const RESET = createAction(
    '[POSITION] RESET'
);

