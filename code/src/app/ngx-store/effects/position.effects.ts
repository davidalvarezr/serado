import {Injectable} from '@angular/core';
import {PositionService} from '../../services/position.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as PositionActions from '../actions/position.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PositionFactoryService} from '../../models/permissionsFactory/position-factory.service';
import {IPositionCrossPlatform} from '../../models/permissionsFactory/IPositionCrossPlatform';
import {from, of} from 'rxjs';
import {Coordinates, Geoposition} from '@ionic-native/geolocation';
import {PositionResponse} from '../../models/permissionsFactory/PositionResponse';
import * as fromPosition from '../reducers/position.reducer.js';

@Injectable()
export class PositionEffects {

    private positionService: IPositionCrossPlatform;

    loadPosition$ = createEffect(() => this.actions$.pipe(
        ofType(PositionActions.LOAD_POSITION.type),
        mergeMap(() => from(this.positionService.getPosition()).pipe(
            map((res: PositionResponse) => {
                console.log('RES', res)

                const positionReducerState: fromPosition.State = {
                    // @ts-ignore
                    coords: {
                      longitude: (res as Geoposition).coords.longitude,
                      latitude: (res as Geoposition).coords.latitude,
                    },
                    loading: false,
                    loaded: res !== 'NOT_AVAILABLE' && res !== 'NOT_GRANTED',
                    isAvailable: res !== 'NOT_AVAILABLE' && res !== 'NOT_GRANTED',
                    error: null,
                    hasPermission: res !== 'NOT_GRANTED',
                };

                return PositionActions.LOAD_POSITION_SUCCESS({
                    positionReducerState,
                });
            }),
            catchError(error => of(PositionActions.LOAD_POSITION_FAILURE({error}))),
        ))
    ));

    constructor(
        private actions$: Actions,
        private positionFactory: PositionFactoryService,
    ) {
        this.positionService = this.positionFactory.getCorrectPositionPermissionService();
    }
}
