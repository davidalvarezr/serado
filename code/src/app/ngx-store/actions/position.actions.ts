import { createAction, props } from '@ngrx/store';
import * as fromPosition from '../reducers/position.reducer';


export const SET_POSITION = createAction(
    '[POSITION] SET POSITION',
    props<{positionReducerState: fromPosition.State}>()
);

export const RESET = createAction(
    '[POSITION] RESET'
);
