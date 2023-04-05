import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EautoPage } from './eauto.page';

const routes: Routes = [
  {
    path: '',
    component: EautoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EautoPageRoutingModule {}
