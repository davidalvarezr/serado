import {createAction, props} from '@ngrx/store';
import {Ad, AdsSort} from '../../models/Models';

export const LOAD_ADS = createAction(
    '[LISTS] LOAD ADS',
    props<{sort: AdsSort}>(),
);

export const LOAD_ADS_SUCCESS = createAction(
    '[LISTS] LOAD ADS SUCCESS',
    props<{ads: Ad[]}>(),
);

export const LOAD_ADS_FAILURE = createAction(
    '[LISTS] LOAD ADS FAILURE',
    props<{ error: any }>(),
);

export const FIND_COORDINATES = createAction(
    '[LISTS] FIND COORDINATES',
    props<{ ads: Ad[] }>(),
);

export const FIND_COORDINATES_SUCCESS = createAction(
    '[LISTS] FIND COORDINATES SUCCESS',
    props<{ ads: Ad[] }>(),
);

export const FIND_COORDINATES_FAILURE = createAction(
    '[LISTS] FIND COORDINATES FAILURE',
    props<{ ads: Ad[] }>(),
);

export const ADD_DISTANCES_SUCCESS = createAction(
    '[LISTS] ADD DISTANCES SUCCESS',
    props<{ ads: Ad[] }>(),
);

export const ADD_DISTANCES_FAILURE = createAction(
    '[LISTS] ADD DISTANCES FAILURE',
    props<{ ads: Ad[], error: any }>(),
);

export const LOAD_INFOS = createAction(
    '[LISTS] LOAD INFOS',
);

export const LOAD_INFOS_SUCCESS = createAction(
    '[LISTS] LOAD INFOS SUCCESS',
);

export const LOAD_INFOS_FAILURE = createAction(
    '[LISTS] LOAD INFOS FAILURE',
);


export const RESET = createAction(
    '[LISTS] RESET',
);
