import { createAction, props } from '@ngrx/store';
import {AdsSort} from '../../models/Models';

export const LOAD_ADS = createAction(
  '[LISTS] LOAD ADS'
);

export const LOAD_ADS_SUCCESS = createAction(
    '[LISTS] LOAD ADS SUCCESS'
);

export const LOAD_ADS_FAILURE = createAction(
    '[LISTS] LOAD ADS FAILURE'
);

export const SORT_ADS = createAction(
    '[LISTS] SORT ADS',
    props<{sort: AdsSort}>()
);

export const LOAD_INFOS = createAction(
    '[LISTS] LOAD INFOS'
);

export const LOAD_INFOS_SUCCESS = createAction(
    '[LISTS] LOAD INFOS SUCCESS'
);

export const LOAD_INFOS_FAILURE = createAction(
    '[LISTS] LOAD INFOS FAILURE'
);


export const RESET = createAction(
    '[LISTS] RESET'
);
