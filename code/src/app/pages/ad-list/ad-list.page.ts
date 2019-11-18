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
        this.showAlertTellingWhyPositionIsNeededIfFirstTime();
        this.store.dispatch(PositionActions.LOAD_POSITION());
        // this.getAllJobs();
        this.positionState$ = this.store.select(positionSelectors.getPositionState);
    }

    private getAllJobs(): void {
        this.jobsService.getAllJobs()
            .subscribe(
                res => {
                    this.adList = res;
                },
                err => { console.error(err); }
            );
    }

    private async showAlertTellingWhyPositionIsNeededIfFirstTime(): Promise<void> {
        const trueIfAlreadyInit = await this.storage.get('trueIfAlreadyInit');
        if (trueIfAlreadyInit) { return; }
        const str = 'Serado Annonces a besoin de votre position afin de vous montrer les offres le splus proches de chez vous';
        alert(str);
        await this.storage.set('trueIfAlreadyInit', true);
    }
}
