import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirebrigadePage } from './firebrigade.page';

const routes: Routes = [
  {
    path: '',
    component: FirebrigadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirebrigadePageRoutingModule {}
