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
import {AdsSort} from '../../models/Models';

@Injectable()
export class ListsEffects {

    loadAds$ = createEffect(() => this.actions$.pipe(
        ofType(ListsActions.LOAD_ADS),
        mergeMap(({sort}) => this.jobsService.getAllJobs().pipe(
            tap(() => console.log('sort', sort)),
            map(
                (ads: any) => {
                    if (sort === AdsSort.NONE) {
                        return ListsActions.LOAD_ADS_SUCCESS({ads});
                    }
                    return ListsActions.FIND_COORDINATES({ads});
                }),
                catchError(error => {
                    return of(ListsActions.LOAD_ADS_FAILURE({error}));
                }),
            ),
        )),
    );

    /*sortAdList$ = createEffect(() => this.actions$.pipe(
        ofType(ListsActions.FIND_COORDINATES),
        tap(() => console.log('ADDING COORDINATES...')),
    ));*/

    constructor(
        private actions$: Actions,
        private jobsService: JobsService,
    ) {}
}
