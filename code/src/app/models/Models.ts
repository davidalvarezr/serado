export interface LatLng  {
    lat: number;
    lng: number;
}

export interface Ad {
    id: number;
    title: string;
    location: string;
    coordinates?: LatLng;
    distanceFromHere?: number;
    contract: string;
    beginning: string;
}

// TODO: add other fields after parsing HTML
export interface AdNotComplete {
    id: number;
    title: string;
    link: string;
    // contract: string;
    // beginning: string;
}

export interface TitleAndDescription {
    title: string;
    description: string;
}

export interface AdComplete {
    id: number;
    title: string;
    link: string;
    infos: TitleAndDescription[];
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

