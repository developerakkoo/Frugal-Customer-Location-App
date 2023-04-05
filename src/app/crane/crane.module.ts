import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CranePageRoutingModule } from './crane-routing.module';

import { CranePage } from './crane.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CranePageRoutingModule
  ],
  declarations: [CranePage]
})
export class CranePageModule {}
