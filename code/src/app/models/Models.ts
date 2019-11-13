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



