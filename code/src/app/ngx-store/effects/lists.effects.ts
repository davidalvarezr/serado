import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {PositionFactoryService} from '../../models/permissionsFactory/position-factory.service';
import {IPositionCrossPlatform} from '../../models/permissionsFactory/IPositionCrossPlatform';
import {from, of} from 'rxjs';
import {Geoposition} from '@ionic-native/geolocation';
import {PositionResponse} from '../../models/permissionsFactory/PositionResponse';
import * as fromPosition from '../reducers/position.reducer.js';
import {ListsActions, PositionActions} from '../actions';
import {JobsService} from '../../services/jobs.service';

@Injectable()
export class ListsEffects {

    loadJobs$ = createEffect(() => this.actions$.pipe(
        ofType(ListsActions.LOAD_ADS.type),
        mergeMap(() => this.jobsService.getAllJobs().pipe(
            map(
                (ads: any) => ListsActions.LOAD_ADS_SUCCESS({ads}),
                catchError(error => {
                    return of(ListsActions.LOAD_ADS_FAILURE({error}));
                }),
            ),
        )),
    ));

    constructor(
        private actions$: Actions,
        private jobsService: JobsService,
    ) {}
}
