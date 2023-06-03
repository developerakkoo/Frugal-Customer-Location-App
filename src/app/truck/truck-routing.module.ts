import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TruckPage } from './truck.page';

const routes: Routes = [
  {
    path: '',
    component: TruckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TruckPageRoutingModule {}
