import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {PositionFactoryService} from '../../models/permissionsFactory/position-factory.service';
import {IPositionCrossPlatform} from '../../models/permissionsFactory/IPositionCrossPlatform';
import {from, of, zip} from 'rxjs';
import {Geoposition} from '@ionic-native/geolocation';
import {PositionResponse} from '../../models/permissionsFactory/PositionResponse';
import * as fromPosition from '../reducers/position.reducer.js';
import {ListsActions, PositionActions} from '../actions';
import {JobsService} from '../../services/jobs.service';
import {AdsSort} from '../../models/Models';
import {PositionService} from '../../services/position.service';

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

    findCoordinates$ = createEffect(() => this.actions$.pipe(
        ofType(ListsActions.FIND_COORDINATES),
        mergeMap(({ads}) => {
            const arrayOfObs = [];
            for (let i = 0; i < ads.length; i++) {
                const ad = ads[i];
                arrayOfObs.push(this.positionService.checkIfGeolocaIsStorageOrGetItFromAPI(`${ad.id}`, ad.location));
            }
            return zip(...arrayOfObs).pipe(
                map(
                    (arrayOfResponses: any) => {
                        for (let i = 0; i < ads.length; i++) {
                            const ad = ads[i];
                            ad.coordinates = arrayOfResponses[i];
                        }

                        return ListsActions.FIND_COORDINATES_SUCCESS({ads});
                    }
                ),
                catchError(error => { console.log(error); return of(error); }),
            );
        }),
    ));

    constructor(
        private actions$: Actions,
        private jobsService: JobsService,
        private positionService: PositionService,
    ) {}
}
