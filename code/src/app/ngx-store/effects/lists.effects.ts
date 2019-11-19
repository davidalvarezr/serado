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
import {Ad, AdsSort, LatLng} from '../../models/Models';
import {PositionService} from '../../services/position.service';
import {FIND_COORDINATES_SUCCESS} from '../actions/lists.actions';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {positionSelectors} from '../selectors';

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

    addDistances$ = createEffect(() => this.actions$.pipe(
        ofType(ListsActions.FIND_COORDINATES_SUCCESS),
        map(({ads}) => {
            const adsWithDistance = ads.map((ad: Ad) => {
                return {
                    ...ad,
                    distanceFromHere: this.positionService.distanceBetween(this.myLocation, ad.coordinates)
                };
            });
            return ListsActions.FINISHED_ADDING_DISTANCES({ads: adsWithDistance});
        }),
    ));

    myLocation: LatLng;

    constructor(
        private actions$: Actions,
        private jobsService: JobsService,
        private positionService: PositionService,
        private store: Store<AppState>,
    ) {
        this.store.select(positionSelectors.getCoordinatesState)
            .subscribe(coords => {
                if (coords) {
                    this.myLocation = {
                        lat: coords.latitude,
                        lng: coords.longitude,
                    };
                }

            });
    }
}
