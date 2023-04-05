import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoFormPageRoutingModule } from './auto-form-routing.module';

import { AutoFormPage } from './auto-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AutoFormPageRoutingModule
  ],
  declarations: [AutoFormPage]
})
export class AutoFormPageModule {}
