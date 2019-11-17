import { createAction, props } from '@ngrx/store';
import * as fromPosition from '../reducers/position.reducer';


export const LOAD_POSITION = createAction(
    '[POSITION] LOAD POSITION'
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
