import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { HandlerService } from '../handler.service';

@Component({
  selector: 'app-enter-pin',
  templateUrl: './enter-pin.page.html',
  styleUrls: ['./enter-pin.page.scss'],
})
export class EnterPinPage implements OnInit {

  pin!:string;
  partnerId:any;
  constructor(private handler: HandlerService,
              private alertController: AlertController,
              private route: ActivatedRoute,
              private menuCtrl: MenuController,
              private router: Router) {
                this.partnerId = this.route.snapshot.paramMap.get("id");
                this.menuCtrl.enable(false);
               }

  ngOnInit() {
  }

  pinSetEvent(ev:any){
    console.log(ev);
    if(ev.length == 4){
      console.log(ev);
      this.checkForPin(ev);
    }
    
  }


  async checkForPin(pin:any){
    let value = await this.handler.get("pin");
    if(value == pin){
      console.log("PIN MATCHED");
      this.router.navigate(['home', this.partnerId]);
      
      
    }else{
      this.handler.presentToast("Wrong Pin Entered!");
    }
  }
 

}
