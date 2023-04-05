import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BulldozerPageRoutingModule } from './bulldozer-routing.module';

import { BulldozerPage } from './bulldozer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BulldozerPageRoutingModule
  ],
  declarations: [BulldozerPage]
})
export class BulldozerPageModule {}
