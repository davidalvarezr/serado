import { Component, OnInit, Input } from '@angular/core';
import {Ad} from '../../models/Models';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent implements OnInit {

  @Input() ads: Ad[];

  constructor() { }

  ngOnInit() {}

}
