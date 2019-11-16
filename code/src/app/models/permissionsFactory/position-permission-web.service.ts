import { Injectable } from '@angular/core';
import {IPositionPermissionCrossPlatform} from './IPositionPermissionCrossPlatform';
import {PositionResponse} from './PositionResponse';

@Injectable({
  providedIn: 'root'
})
export class PositionPermissionWebService implements IPositionPermissionCrossPlatform{

  constructor() { }

  askPositionPermission(): boolean {
    return false;
  }

  checkPositionPermission(): boolean {
    return false;
  }

  getPosition(): PositionResponse {
    return undefined;
  }

  hasAlreadyGivenAccessToPosition(): boolean {
    return false;
  }
}
