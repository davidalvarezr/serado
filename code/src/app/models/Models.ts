export interface Ad {
    id: number;
    title: string;
    location: string;
    distanceFromHere?: number;
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

