export interface Ad {
    title: string;
    location: string;
    contract: string;
    beginning: string;
}

export interface Position {
    lat: number;
    long: number;
}

export enum AdSort {
    PositionAsc,
    PositionDesc,
    DateAsc,
    DateDesc
}



