import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LangingPagePageRoutingModule } from './langing-page-routing.module';

import { LangingPagePage } from './langing-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LangingPagePageRoutingModule
  ],
  declarations: [LangingPagePage]
})
export class LangingPagePageModule {}
