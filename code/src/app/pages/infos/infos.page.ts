import {Component, OnInit} from '@angular/core';
import {InfosService} from '../../services/infos.service';

@Component({
    selector: 'app-infos',
    templateUrl: './infos.page.html',
    styleUrls: ['./infos.page.scss'],
})
export class InfosPage implements OnInit {

    infos: string;
    loading = false;

    constructor(private infosService: InfosService) {
    }

    ngOnInit() {
        // tslint:disable-next-line:no-console
        this.loading = true;
        this.infosService.getInfos().subscribe(
            res => {
                // console.log(res);
                this.infos = res;
                this.loading = false;
            });
    }

}
