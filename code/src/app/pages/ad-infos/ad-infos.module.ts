import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdInfosPage } from './ad-infos.page';
import {GoogleMapsComponent} from '../../components/google-maps/google-maps.component';

const routes: Routes = [
  {
    path: '',
    component: AdInfosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
    declarations: [AdInfosPage, GoogleMapsComponent]
})
export class AdInfosPageModule {}
