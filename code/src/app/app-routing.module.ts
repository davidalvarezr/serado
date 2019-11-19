import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ad-list',
    pathMatch: 'full'
  },
  { path: 'ad-list', loadChildren: './pages/ad-list/ad-list.module#AdListPageModule' },
  { path: 'ad-list/:id', loadChildren: './pages/ad-infos/ad-infos.module#AdInfosPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
