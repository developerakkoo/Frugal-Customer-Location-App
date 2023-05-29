import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HandlerService } from '../handler.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userId:any;

  list:any[] = [];

  getUserSub!:Subscription;
  getTransactionSub!:Subscription;

  constructor(private http: HttpClient,
              private router: Router,
              private route:ActivatedRoute,
              private menuCtrl:MenuController, 
              private handler: HandlerService) {
                this.userId = this.route.snapshot.paramMap.get('id');
                this.menuCtrl.enable(false);
                this.getUser();
                this.getTransaction();
               }

  ngOnInit() {
  }


  ionViewDidLeave(){
    console.log("Profile left");
    this.getUserSub.unsubscribe();
    
  }

  getTransaction(){
    this.http.get(environment.URL + `/api/getByUserId/contactHistory/${this.userId}`)
    .subscribe({
      next:(value:any) =>{
        console.log(value['savedCallHistory']);
        this.list = value['savedCallHistory'];
        
      },
      error: (error) =>{
        console.log(error);
        
      }
    })
  }
  getUser(){
    this.getUserSub = this.http.get(environment.URL+ `/App/api/v1/getById/user/${this.userId}`)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.getTransaction();

        
      },error:(error) =>{
        console.log(error);
        
      }
    })
  }
}
