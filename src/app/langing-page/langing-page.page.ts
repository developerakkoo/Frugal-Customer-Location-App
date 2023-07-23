import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-langing-page',
  templateUrl: './langing-page.page.html',
  styleUrls: ['./langing-page.page.scss'],
})
export class LangingPagePage implements OnInit {

  constructor(private menuCtrl: MenuController,
              private router: Router) { 
  }

  ngOnInit() {
    this.menuCtrl.enable(false);

  }

  ionViewDidEnter(){

  }


  login(){
    this.router.navigate(['auth'])
  }
  register(){
    this.router.navigate(['register'])

  }
}
