import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, timeout} from 'rxjs/operators';
import {PositionFactoryService} from '../../models/permissionsFactory/position-factory.service';
import {IPositionCrossPlatform} from '../../models/permissionsFactory/IPositionCrossPlatform';
import {from, of} from 'rxjs';
import {Geoposition} from '@ionic-native/geolocation';
import {PositionResponse} from '../../models/permissionsFactory/PositionResponse';
import * as fromPosition from '../reducers/position.reducer.js';
import {ListsActions, PositionActions} from '../actions';
import {AdsSort} from '../../models/Models';
import {timeouts} from '../../../environments/timeouts';

@Injectable()
export class PositionEffects {

    private positionService: IPositionCrossPlatform;

    loadPosition$ = createEffect(() => this.actions$.pipe(
        ofType(PositionActions.LOAD_POSITION_FOR_LIST),
        mergeMap(() => from(this.positionService.getPosition()).pipe(
            map((res: PositionResponse) => {
                // console.log('RES', res)

                const positionReducerState: fromPosition.State = {
                    // @ts-ignore
                    coords: {
                      longitude: (res as Geoposition).coords.longitude,
                      latitude: (res as Geoposition).coords.latitude,
                    },
                    loading: false,
                    loaded: res !== 'NOT_AVAILABLE' && res !== 'NOT_GRANTED',
                    isAvailable: res !== 'NOT_AVAILABLE' && res !== 'NOT_GRANTED',
                    error: res === 'NOT_AVAILABLE' ? 'Position indisponible' :
                        (res === 'NOT_GRANTED' ? 'Vous avez refusé l\'accès à votre positions' : null),
                    hasPermission: res !== 'NOT_GRANTED',
                };

                return PositionActions.LOAD_POSITION_SUCCESS({
                    positionReducerState,
                });
            }),
            timeout(timeouts.loadPosition),
            catchError(error => {
                console.error('ERROR', error);
                return of(PositionActions.LOAD_POSITION_FAILURE({error: 'Position indisponible'}));
            }),
        ))
    ));

    loadPositionSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(PositionActions.LOAD_POSITION_SUCCESS),
        map(() => ListsActions.LOAD_ADS({sort: AdsSort.POSITION_ASC})),
        // FIXME: I think this is impossible that an error happens here ?!
        catchError(error => { console.error(error); return of(error); })
    ));

    loadPositionFailure$ = createEffect(() => this.actions$.pipe(
        ofType(PositionActions.LOAD_POSITION_FAILURE),
        map(() => ListsActions.LOAD_ADS({sort: AdsSort.NONE})),
        // FIXME: I think this is impossible that an error happens here ?!
        catchError(error => { console.error('ERROR', error); return of(error); })
    ));

    constructor(
        private actions$: Actions,
        private positionFactory: PositionFactoryService,
    ) {
        this.positionService = this.positionFactory.getCorrectPositionPermissionService();
    }
}
