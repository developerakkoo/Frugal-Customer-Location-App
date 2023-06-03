import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirebrigadePageRoutingModule } from './firebrigade-routing.module';

import { FirebrigadePage } from './firebrigade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirebrigadePageRoutingModule
  ],
  declarations: [FirebrigadePage]
})
export class FirebrigadePageModule {}
