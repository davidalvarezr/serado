import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdListPage } from './ad-list.page';
import {AdCellComponent} from '../../components/ad-cell/ad-cell.component';
import {AdListComponent} from '../../components/ad-list/ad-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AdListPage, AdListComponent, AdCellComponent]
})
export class AdListPageModule {}
