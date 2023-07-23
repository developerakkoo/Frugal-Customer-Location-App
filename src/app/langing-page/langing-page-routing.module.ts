import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LangingPagePage } from './langing-page.page';

const routes: Routes = [
  {
    path: '',
    component: LangingPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LangingPagePageRoutingModule {}
