import {PositionResponse} from './PositionResponse';

export interface IPositionCrossPlatform {
    /**
     * Gets the position of the user
     * @returns the Position or 'NOT_AVAILABLE'
     */
    getPosition(): Promise<PositionResponse>;
}
