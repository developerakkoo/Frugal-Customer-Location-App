import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TractorPage } from './tractor.page';

const routes: Routes = [
  {
    path: '',
    component: TractorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractorPageRoutingModule {}
