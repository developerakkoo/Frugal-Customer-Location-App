import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TruckPageRoutingModule } from './truck-routing.module';

import { TruckPage } from './truck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruckPageRoutingModule
  ],
  declarations: [TruckPage]
})
export class TruckPageModule {}
