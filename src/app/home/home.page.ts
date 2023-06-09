import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController, MenuController, ToastController } from '@ionic/angular';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userId:any;
  marker:any;
  Automarker:any;
  location:any;
  isLocationPicked:boolean = false;

  @ViewChild('map') mapView!: ElementRef;

  @ViewChild("placesRef") places! : GooglePlaceDirective;

  options!: Options;


  map: any;

  lat: any;
  lng: any;
  constructor(private menuCtrl: MenuController,
              private router: Router,
              private route:ActivatedRoute,
              private http: HttpClient,
              private toastController: ToastController) {
                this.userId = this.route.snapshot.paramMap.get("id");
                this.getUserPosition();

               }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  clearSearch(){
    this.places.reset();
    this.getUserPosition();

  }

  public handleAddressChange(address: Address) {
         // Do some stuff
         console.log(address.formatted_address.toString().length);
         
         console.log(address.formatted_address);
         this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.formatted_address}&key=AIzaSyA3UHehSfpUv3J_7fF0NTgbRLuB17CkOxg`)
          .subscribe({
            next:(value:any) =>{
              console.log(value['results'][0]['geometry']['location']);
              this.location = value['results'][0]['geometry']['location'];
              this.isLocationPicked = true;
              this.addMap(this.location['lat'], this.location['lng']);
            },
            error:(error) =>{
              console.log(error);
              this.isLocationPicked = false;
              this.getUserPosition();
              
            }
          })
         //App Marker on this Position
         
}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'This page not implemented yet! Under Progress.',
      duration: 2000,
      position:'middle'
    });
    toast.present();
  }


  openUserProfile(){
    this.router.navigate(['profile', this.userId]);
  }
  async getUserPosition() {

    console.log("Add map get user pos");
    
    let position = await Geolocation.getCurrentPosition();
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    this.isLocationPicked = false;

    this.addMap(position.coords.latitude, position.coords.longitude);
  }
  addMap(lat: any, lon: any) {

    let latlng = new google.maps.LatLng(lat, lon);

    let mapOptions = {
      center: latlng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapView.nativeElement, mapOptions);
    
 

    this.addMarker();

  }

  addMarker() {
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      draggable: true,
      // icon: '/assets/rikshaw.png',
      // label: { color: '#121212', fontWeight: 'bold', fontSize: '10px', text: 'YOU ARE HERE!' }
      //icon: ''
    });

    // this.getOnDragEvent(this.marker);

    // let content = "<p>Your Current Location</p>";
    // this.getAllAutos();

  }
  
  openTanker(){
    if(this.isLocationPicked == true){

      this.router.navigate(['tanker', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['tanker', this.lat,this.lng, this.userId]);
    }
  }

  openFire(){
    if(this.isLocationPicked == true){

      this.router.navigate(['firebrigade', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['firebrigade', this.lat,this.lng, this.userId]);
    }

  }

  openAmbulance(){
    if(this.isLocationPicked == true){

      this.router.navigate(['ambulance', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['ambulance', this.lat,this.lng, this.userId]);
    }
  }

  openRiskshaw(){
    if(this.isLocationPicked == true){

      this.router.navigate(['auto', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['auto', this.lat,this.lng, this.userId]);
    }

  }

  openERiskshaw(){
    if(this.isLocationPicked == true){

      this.router.navigate(['eauto', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['eauto', this.lat,this.lng, this.userId]);
    }

  }

  openCargo(){
    if(this.isLocationPicked == true){

      this.router.navigate(['cargo', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['cargo', this.lat,this.lng, this.userId]);
    }

  }

  openTruck(){
    if(this.isLocationPicked == true){

      this.router.navigate(['truck', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['truck', this.lat,this.lng, this.userId]);
    }

  }

  openCrane(){
    if(this.isLocationPicked == true){

      this.router.navigate(['crane', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['crane', this.lat,this.lng, this.userId]);
    }

  }

  openBulldozer(){
    if(this.isLocationPicked == true){

      this.router.navigate(['bulldozer', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['bulldozer', this.lat,this.lng, this.userId]);
    }
  }

  openSchoolvan(){
    if(this.isLocationPicked == true){

      this.router.navigate(['schoolvan', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['schoolvan', this.lat,this.lng, this.userId]);
    }

  }

  openTractor(){
    if(this.isLocationPicked == true){

      this.router.navigate(['tractor', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['tractor', this.lat,this.lng, this.userId]);
    }

  }

  openRoadRoller(){
    if(this.isLocationPicked == true){

      this.router.navigate(['roadroller', this.location['lat'],this.location['lng'] , this.userId]);
    }
    if(this.isLocationPicked == false){

      this.router.navigate(['roadroller', this.lat,this.lng, this.userId]);
    }

  }
}
