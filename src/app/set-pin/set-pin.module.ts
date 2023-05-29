import { NgOtpInputModule } from 'ng-otp-input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetPinPageRoutingModule } from './set-pin-routing.module';

import { SetPinPage } from './set-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgOtpInputModule,
    SetPinPageRoutingModule
  ],
  declarations: [SetPinPage]
})
export class SetPinPageModule {}
