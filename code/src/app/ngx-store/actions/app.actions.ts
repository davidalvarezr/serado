import {createAction, props} from '@ngrx/store';
import {AppState} from '../../models/Models';

export const APP_INIT = createAction(
    '[APP] APP INIT',
    props<{wholeState: AppState}>()
);


