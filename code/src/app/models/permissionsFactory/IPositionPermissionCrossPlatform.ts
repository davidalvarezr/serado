import {PositionResponse} from './PositionResponse';

export interface IPositionPermissionCrossPlatform {
    /**
     * Checks if the app already asked the permission
     */
    hasAlreadyGivenAccessToPosition(): boolean;

    /**
     * Ask to the user, the permission to have access to his position
     * @returns the answer of the user
     */
    askPositionPermission(): boolean;

    /**
     * Checks if the app has the permission to access the position of the user
     * @returns the access permission
     */
    checkPositionPermission(): boolean;

    /**
     * Gets the position of the user
     * @returns the Position or 'NOT_AVAILABLE'
     */
    getPosition(): PositionResponse;
}
