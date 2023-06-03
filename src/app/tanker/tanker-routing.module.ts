import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TankerPage } from './tanker.page';

const routes: Routes = [
  {
    path: '',
    component: TankerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TankerPageRoutingModule {}
