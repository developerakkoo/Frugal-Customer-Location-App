import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menuCtrl: MenuController,
              private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'This page not implemented yet! Under Progress.',
      duration: 2000,
      position:'middle'
    });
    toast.present();
  }

  openTanker(){
    this.presentToast();
  }

  openFire(){
    this.presentToast();

  }

  openAmbulance(){
    this.router.navigate(['folder', 'ambulance'])
  }

  openRiskshaw(){
    this.router.navigate(['folder', 'Auto'])

  }

  openERiskshaw(){
    this.router.navigate(['folder', 'eauto'])

  }

  openCargo(){
    // this.router.navigate(['folder', 'anbulance'])
    this.presentToast();

  }

  openTruck(){
    this.presentToast();

  }

  openCrane(){
    this.router.navigate(['folder', 'crane'])

  }

  openBulldozer(){
    this.router.navigate(['folder', 'bulldozer'])

  }

  openSchoolvan(){
    this.router.navigate(['folder', 'schoolvan'])

  }

  openTractor(){
    this.presentToast();

  }

  openRoadRoller(){
    this.presentToast();

  }
}
