import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EautoPageRoutingModule } from './eauto-routing.module';

import { EautoPage } from './eauto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EautoPageRoutingModule
  ],
  declarations: [EautoPage]
})
export class EautoPageModule {}
