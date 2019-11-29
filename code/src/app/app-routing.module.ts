import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


// 1) Try with lazy loaded and import modules
const routes: Routes = [
  {
    path: '',
    redirectTo: 'infos',
    pathMatch: 'full'
  },
  { path: 'ad-list', loadChildren: () => import('./pages/ad-list/ad-list.module').then(mod => mod.AdListPageModule) },
  { path: 'ad-list/:id', loadChildren: () => import('./pages/ad-infos/ad-infos.module').then(mod => mod.AdInfosPageModule) },
  { path: 'partners', loadChildren: () => import('./pages/partners/partners.module').then(mod => mod.PartnersPageModule) },
  { path: 'infos', loadChildren: () => import('./pages/infos/infos.module').then(mod => mod.InfosPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      // enableTracing: true,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
