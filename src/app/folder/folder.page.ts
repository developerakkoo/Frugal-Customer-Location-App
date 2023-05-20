import { AutoFormPage } from './../auto-form/auto-form.page';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController, MenuController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

declare var google: any;
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  marker: any;
  Automarker: any;
  @ViewChild('map') mapView!: ElementRef;



  map: any;

  lat: any;
  lng: any;

  autos!: any[];
  isAuto: boolean = true;
  isEAuto: boolean = false;
  isAmbulance: boolean = false;
  isSchoolvan: boolean = false;
  isCrane: boolean = false;
  isbulldozer: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private http: HttpClient) {
    this.menuCtrl.enable(false);

  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    console.log(this.folder);

    this.getUserPosition();

    // setInterval(() =>{
    //   this.getAllAutos();
    // }, 9000)


  }


async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Loading...',
  });
  await loading.present();
}  

getAllAutos() {
    this.http.get(environment.URL + "/App/api/v1/get/vehicle")
      .subscribe({
        next: (autos: any) => {
          console.log(autos);
          this.addAutoMarkers(autos['vehicle']);

        },
        error: (error) => {
          console.log(error);

        }

      })
  }
  async getUserPosition() {

    console.log("Add map get user pos");

    let position = await Geolocation.getCurrentPosition();
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;

    this.addMap(position.coords.latitude, position.coords.longitude, this.folder);
  }

  async updateUserPosition() {

    console.log("Updating user pos");

    let position = await Geolocation.getCurrentPosition();
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;



  }

  addMap(lat: any, lon: any, type: string) {
    this.presentLoading();
    let latlng = new google.maps.LatLng(lat, lon);

    let mapOptions = {
      center: latlng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapView.nativeElement, mapOptions);

    //   if(type == "Auto"){
    //  }
    //  if(type == "E-Auto"){
    //   this.map = new google.maps.Map(this.eautoView.nativeElement, mapOptions);
    //  }
    //  if(type == "Ambulance"){
    //   this.map = new google.maps.Map(this.ambulanceView.nativeElement, mapOptions);
    //  }
    //  if(type == "Crane"){
    //   this.map = new google.maps.Map(this.craneView.nativeElement, mapOptions);
    //  }
    //  if(type == "Bulldozer"){
    //   this.map = new google.maps.Map(this.bulldozerView.nativeElement, mapOptions);
    //  } if(type == "SchoolVan"){
    //   this.map = new google.maps.Map(this.schoolvanView.nativeElement, mapOptions);
    //  }

    this.addMarker();
    google.maps.event.addListener(this.map, "tilesloaded",() => {
      console.log("Map is fully loaded");
      
      this.loadingController.dismiss();
    });
  }


  getOnDragEvent(vMarker: any) {
    google.maps.event.addListener(vMarker, 'dragend',
      (evt: any) => {


        console.log(evt);
      })

  }

  // changeMarkerPosition(marker: any) {
  //   var latlng = new google.maps.LatLng(40.748774, -73.985763);
  //   marker.setPosition(latlng);
  // }


  addAutoMarkers(autos: any[]) {
    console.log(autos);
    for (let index = 0; index < autos.length; index++) {
      const element = autos[index];
      console.log(`Count location ${autos.length}`);

      console.log(element['coordinates']);

     if(element['coordinates'].length != 0){
       let contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
    
      '<div style="color: black;" class="firstHeading" id="bodyContent">' +
      element['Category'] +
      "<br />"+
      element['MobileNumber'] +
      "<br />"+
      element['Rates'] +
      
      `<p><a href="tel:+91${element['VehiclesOwnerId']['MobileNumber']}">` +
    "Call</a> " +
      
      "</div>" +
      "</div>";
  
      let latlng = new google.maps.LatLng(element['coordinates'][0], element['coordinates'][1]);
      // console.log(Object.values(el)[0].location);
      this.Automarker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latlng,
        draggable: false,
        icon: '/assets/auto.ico',
        title: element['MobileNumber'].toString(),
        label: { color: '#121212', fontWeight: 'bold', fontSize: '20px', text: element['Category'] }
        //icon: ''
      });
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      console.log(`marker ${index} added`);
      console.log(`InfoWindow ${index} added`);
      infowindow.open({
        anchor: this.Automarker,
        map: this.map,
      });


      google.maps.event.addListener(this.Automarker, 'click',
        (evt: any) => {
          console.log(this.Automarker.getTitle());
          //open modal for from to and fares
          // this.presentAutoModal(this.Automarker.getTitle());
        })

       

    }



     }
  }


  async presentAutoModal(id: any) {
    let a = document.createElement("a");
    a.href = `tel: +91${id}`;
    a.click();
    // const modal = await this.modalController.create({
    // component: AutoFormPage,
    // componentProps: { id: id }
    // });

    // await modal.present();

  }

  addMarker() {
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      draggable: true,
      // icon: '/assets/rikshaw.png',
      label: { color: '#121212', fontWeight: 'bold', fontSize: '10px', text: 'YOU ARE HERE!' }
      //icon: ''
    });

    this.getOnDragEvent(this.marker);

    let content = "<p>Your Current Location</p>";
    this.getAllAutos();

  }

}
