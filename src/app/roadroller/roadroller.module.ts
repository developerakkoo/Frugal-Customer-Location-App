import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoadrollerPageRoutingModule } from './roadroller-routing.module';

import { RoadrollerPage } from './roadroller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoadrollerPageRoutingModule
  ],
  declarations: [RoadrollerPage]
})
export class RoadrollerPageModule {}
