import { Component, OnInit, Input } from '@angular/core';
import {Ad} from '../../models/Models';

@Component({
  selector: 'app-ad-cell',
  templateUrl: './ad-cell.component.html',
  styleUrls: ['./ad-cell.component.scss'],
})
export class AdCellComponent implements OnInit {
  @Input() ad: Ad;

  constructor() { }

  ngOnInit() {}

}
