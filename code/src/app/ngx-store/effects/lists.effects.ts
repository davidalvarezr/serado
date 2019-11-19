import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of, zip} from 'rxjs';
import {ListsActions} from '../actions';
import {AdService} from '../../services/ad.service';
import {Ad, AdsSort, LatLng} from '../../models/Models';
import {PositionService} from '../../services/position.service';
import {Store} from '@ngrx/store';
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
                console.error(error);
                return of(ListsActions.LOAD_ADS_FAILURE({error}));
            }),
            ),
        )),
    );

    findCoordinates$ = createEffect(() => this.actions$.pipe(
        ofType(ListsActions.FIND_COORDINATES),
        mergeMap(({ads}) => {
            const arrayOfObs = [];
            for (const ad of ads) {
                arrayOfObs.push(this.positionService.checkIfGeolocaIsStorageOrGetItFromAPI(`${ad.id}`, ad.location));
            }
            return zip(...arrayOfObs).pipe(
                map(
                    (arrayOfResponses: any) => {
                        for (let i = 0; i < ads.length; i++) {
                            ads[i].coordinates = arrayOfResponses[i];
                        }
                        return ListsActions.FIND_COORDINATES_SUCCESS({ads});
                    }
                ),
                catchError(error => {
                    console.error(error);
                    return of(ListsActions.FIND_COORDINATES_FAILURE({ads}));
                }),
            );
        }),
    ));
    myLocation: LatLng;
    addDistances$ = createEffect(() => this.actions$.pipe(
        ofType(ListsActions.FIND_COORDINATES_SUCCESS),
        map(({ads}) => {
            const adsWithDistance = ads.map((ad: Ad) => {
                return {
                    ...ad,
                    distanceFromHere: this.positionService.distanceBetween(this.myLocation, ad.coordinates)
                };
            });
            return ListsActions.ADD_DISTANCES_SUCCESS({ads: adsWithDistance});
        }),
    ));

    constructor(
        private actions$: Actions,
        private jobsService: AdService,
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
