import { createAction, props } from '@ngrx/store';
import {AdsSort} from '../../models/Models';
import {Position} from '../reducers/position.reducers';


export const SET_POSITION = createAction(
    '[POSITION] SET POSITION',
    props<{str: string, pos: Position}>()
);

export const RESET = createAction(
    '[POSITION] RESET'
);
