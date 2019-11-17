import {Component, OnInit} from '@angular/core';
import {Ad} from '../../models/Models';
import { Storage } from '@ionic/storage';
import {PositionService} from '../../services/position.service';
import {JobsService} from '../../services/jobs.service';
import {PositionWebService} from '../../models/permissionsFactory/position-web.service';
import {Store} from '@ngrx/store';
import {AppState, PositionState} from '../../ngx-store/reducers';
import {positionSelectors} from '../../ngx-store/selectors';
import {Observable} from 'rxjs';
import {PositionActions} from '../../ngx-store/actions';

@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit {

    positionState$: Observable<PositionState>
    adList: Ad[];

    constructor(private positionService: PositionService,
                private storage: Storage,
                private jobsService: JobsService,
                private posPermWeb: PositionWebService,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.askPosition();
        this.getAllJobs();
        this.positionState$ = this.store.select(positionSelectors.getPositionState);
    }

    private askPosition() {
        this.store.dispatch(PositionActions.LOAD_POSITION());
        /*this.posPermWeb.getPosition()
            .then(res => { console.log('RES', res); });*/

    }

    /*private askPositionOld(): void {
        this.positionService.askPosition()
            .then(pos => {
                this.positionService.setPosition({hasPermission: true, str: '', pos});
            })
            .catch(err => { console.error(err); });
    }*/

    private getAllJobs(): void {
        this.jobsService.getAllJobs()
            .subscribe(
                res => {
                    this.adList = res;
                },
                err => { console.error(err); }
            );
    }

}
