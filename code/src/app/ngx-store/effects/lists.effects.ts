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
                    return ListsActions.LOAD_ADS_SUCCESS({ads, sort});
                    // return ListsActions.FIND_COORDINATES({ads, sort});
                }),
            catchError(error => {
                console.error(error);
                return of(ListsActions.LOAD_ADS_FAILURE({error: 'Les offres d\'emploi n\'ont pas pu être chargées'}));
            }),
            ),
        )),
    );

    loadAdsSuccess = createEffect(() => this.actions$.pipe(
        ofType(ListsActions.LOAD_ADS_SUCCESS),
        map(({ads, sort}) => ListsActions.FIND_COORDINATES({ads, sort}))
    ));

    // loadAdsFailure --> do nothing

    findCoordinates$ = createEffect(() => this.actions$.pipe(
        ofType(ListsActions.FIND_COORDINATES),
        mergeMap(({ads, sort}) => {
            const arrayOfObs = [];

            // Find the coordinates of each ad
            for (const ad of ads) {
                arrayOfObs.push(this.positionService.checkIfGeolocaIsStorageOrGetItFromAPI(`${ad.id}`, ad.location));
            }
            return zip(...arrayOfObs).pipe(
                map(
                    (arrayOfResponses: any) => {
                        for (let i = 0; i < ads.length; i++) {
                            ads[i].coordinates = arrayOfResponses[i];
                        }
                        return ListsActions.FIND_COORDINATES_SUCCESS({ads, sort});
                    }
                ),
                catchError(error => {
                    console.error(error);
                    return of(ListsActions.FIND_COORDINATES_FAILURE({ads, error: 'Les coordonnées n\'ont pas été trouvées'}));
                }),
            );
        }),
    ));

    myLocation: LatLng;

    addDistances$ = createEffect(() => this.actions$.pipe(
        ofType(ListsActions.FIND_COORDINATES_SUCCESS),
        map(({ads, sort}) => {
            if (sort === AdsSort.POSITION_ASC) { // We have the location, sort it with distances
                const adsWithDistance = ads.map((ad: Ad) => {
                    return {
                        ...ad,
                        distanceFromHere: this.positionService.distanceBetween(this.myLocation, ad.coordinates)
                    };
                });
                return ListsActions.ADD_DISTANCES_SUCCESS({ads: adsWithDistance});
            } else { // We don't have the position, just return the ads like that (with coordinates)
                return ListsActions.ADD_DISTANCES_FAILURE({ads, error: 'Calcul des distances impossible'});
            }

        }),
    ));






    constructor(
        private actions$: Actions,
        private jobsService: AdService,
        private positionService: PositionService,
        private store: Store<AppState>,
    ) {
        this.store.select(positionSelectors.getCoordinatesState).subscribe(coords => {
            if (coords) {
                this.myLocation = {
                    lat: coords.latitude,
                    lng: coords.longitude,
                };
            }

        });
    }
}
