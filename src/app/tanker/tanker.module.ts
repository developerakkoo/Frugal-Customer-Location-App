import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TankerPageRoutingModule } from './tanker-routing.module';

import { TankerPage } from './tanker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TankerPageRoutingModule
  ],
  declarations: [TankerPage]
})
export class TankerPageModule {}
