import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolvanPageRoutingModule } from './schoolvan-routing.module';

import { SchoolvanPage } from './schoolvan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolvanPageRoutingModule
  ],
  declarations: [SchoolvanPage]
})
export class SchoolvanPageModule {}
