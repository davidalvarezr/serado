import {State as ListsState} from '../ngx-store/reducers/lists.reducer.js';
import {State as PositionState} from '../ngx-store/reducers/position.reducer.js';

export interface Ad {
    title: string;
    location: string;
    contract: string;
    beginning: string;
}

export interface Info {
    title: string;
    description: string;
    link: string;
}

export enum AdsSort {
    PositionAsc,
    PositionDesc,
    DateAsc,
    DateDesc
}

export interface AppState {
    lists: ListsState;
    position: PositionState;
}

