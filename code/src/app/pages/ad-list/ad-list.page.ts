import { Component, OnInit } from '@angular/core';
import {Ad} from '../../models/Models';

@Component({
  selector: 'app-ad-list-page',
  templateUrl: './ad-list.page.html',
  styleUrls: ['./ad-list.page.scss'],
})
export class AdListPage implements OnInit {

  adBasic: Ad = {
    title: 'Employée de maison logée',
    location: 'Rue de Montchoisy, 1207 Genève',
    contract: 'CDI, 20h/semaine',
    beginning: 'Janvier 2020',
  };

  adBasic2: Ad = {
    title: 'Employée de maison logée 2',
    location: 'Rue de Montchoisy, 1207 Genève',
    contract: 'CDI, 20h/semaine',
    beginning: 'Janvier 2020',
  };

  adList: Ad[] = [this.adBasic, this.adBasic2];

  constructor() { }

  ngOnInit() {
  }

}
