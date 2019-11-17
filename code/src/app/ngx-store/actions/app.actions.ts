import {createAction, props} from '@ngrx/store';
import {AppState} from '../reducers';

export const APP_INIT = createAction(
    '[APP] APP INIT',
    props<{wholeState: AppState}>()
);


