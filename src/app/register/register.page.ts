import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HandlerService } from '../handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  number!:number;
  otp:number = 60;
  isOtp: boolean = false;
  isResendClicked:boolean = false;
  istimerEnd:boolean = false;

  timer!:any;

  timermsg:string ="Resend otp after: 00:";
  postUserSub !:Subscription;
  constructor(private router: Router,
              private handler: HandlerService,
              private menuCtrl: MenuController,
              private http: HttpClient) {
                this.menuCtrl.enable(false);
   }

  ngOnInit() {
  }

  IonViewDidLeave(){
    clearInterval(this.timer);

  }

  startTimer(){
    this.timer = setInterval(() =>{
      this.otp -= 1;
      if(this.otp == 0o0){
        this.otp = 0o0;
        clearInterval(this.timer);
        this.istimerEnd = true;
        this.otp = 60;
        console.log("Interval cleared");
        
      }
    },1000)
  }

  onOtpChange(ev:any){
    if(ev.length == 6){
      console.log(ev);
      this.handler.presentLoading("Verifying OTP...")
      this.http.post(environment.URL +'/App/api/v1/verify', {
        "phonenumber": this.number,
        "code":ev
      }).subscribe({
        next:(value:any) =>{
          console.log(value);
          this.handler.dismissLoading();
          let partnerId = value['userID'];
          this.router.navigate(['profile', partnerId]);
          
        },
        error:(error) =>{
          console.log(error);
          this.handler.dismissLoading();
          
        }
      })
      
    }
    
  }

  resendOtp(){
    this.submit();
  }

  submit(){
    this.handler.presentLoading("Sending OTP...")
    console.log(this.number);
  

    this.startTimer();

    let body ={
      MobileNumber: this.number
    }
    this.http.post(environment.URL + '/App/api/v1/add/user', body)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        // this.isOtp = true;
        // this.istimerEnd = false;
        this.handler.dismissLoading();
        let partnerId = value['userCreated']['_id'];
        this.handler.get('pin').then((pin) =>{
          console.log(pin);
          this.router.navigate(['auth']);
          // if(pin == null){
          //   console.log("PIN NOT SET");
          //   this.router.navigate(['set-pin', partnerId]);
            
          // }else{
          //   this.router.navigate(['enter-pin', partnerId]);

          // }
          
        }).catch((error)=>{
          console.log(error);
          
        })
      },
      error:(error) =>{
        console.log(error);
        this.handler.dismissLoading();
        this.handler.presentToast("Error Logging You In!")
        
      }
  
    })

    // this.http.post(environment.URL +'/App/api/v1/sendOtp', {
    //   "phonenumber": this.number
    // }).subscribe({
    //   next:(value) =>{
    //     console.log(value);
    //     this.isOtp = true;
    //     this.istimerEnd = false;
    //     this.handler.dismissLoading();
    //   },
    //   error:(error) =>{
    //     console.log(error);
    //     this.handler.dismissLoading();

        
    //   }
    // })
    // this.router.navigate(['dash'])

  }

}
