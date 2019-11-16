import {Component, OnInit} from '@angular/core';
import {Ad} from '../../models/Models';
import { Storage } from '@ionic/storage';
import {PositionService} from '../../services/position.service';
import {JobsService} from '../../services/jobs.service';


@Component({
    selector: 'app-ad-list-page',
    templateUrl: './ad-list.page.html',
    styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit {
    adList: Ad[];

    constructor(private positionService: PositionService, private storage: Storage, private jobsService: JobsService) {
        this.askPosition();
        this.getAllJobs();
    }

    ngOnInit() {
        // FIXME: Storing object works in the browser. Test it on cordova platform as well !
        this.storage.set('test', {msg: 'it works !'})
            .catch(err => { console.error(err); });
    }

    private askPosition(): void {
        this.positionService.askPosition()
            .then(pos => {
                this.positionService.setPosition({hasPermission: true, str: '', pos});
            })
            .catch(err => { console.error(err); });
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

}
