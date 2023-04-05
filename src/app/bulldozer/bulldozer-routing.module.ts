import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BulldozerPage } from './bulldozer.page';

const routes: Routes = [
  {
    path: '',
    component: BulldozerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BulldozerPageRoutingModule {}
