import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoadrollerPage } from './roadroller.page';

const routes: Routes = [
  {
    path: '',
    component: RoadrollerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoadrollerPageRoutingModule {}
