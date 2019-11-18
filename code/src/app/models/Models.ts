import {State as ListsState} from '../ngx-store/reducers/lists.reducer.js';
import {State as PositionState} from '../ngx-store/reducers/position.reducer.js';
import {Coordinates} from '@ionic-native/geolocation/ngx';

export interface Ad {
    id: number;
    title: string;
    location: string;
    coordinates: Coordinates;
    contract: string;
    beginning: string;
}

export interface Info {
    title: string;
    description: string;
    link: string;
}

export enum AdsSort {
    NONE,
    POSITION_ASC,
}

