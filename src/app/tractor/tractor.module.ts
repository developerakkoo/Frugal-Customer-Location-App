import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TractorPageRoutingModule } from './tractor-routing.module';

import { TractorPage } from './tractor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TractorPageRoutingModule
  ],
  declarations: [TractorPage]
})
export class TractorPageModule {}
