import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AutoFormPage } from './../auto-form/auto-form.page';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;
@Component({
  selector: 'app-eauto',
  templateUrl: './eauto.page.html',
  styleUrls: ['./eauto.page.scss'],
})
export class EautoPage implements OnInit {
  @ViewChild('map') mapView!: ElementRef;


  map: any;

  lat: any;
  lng: any;

  autos!: any[];
  constructor(private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private http: HttpClient) { }

  ngOnInit() {
    this.getUserPosition();

  }


  getAllAutos() {
    this.http.get("https://consign-612af-default-rtdb.firebaseio.com/E-Auto.json").subscribe((autos: any) => {
      console.log(autos);
      var arr_obj = Object.keys(autos).map(key => ({ key: autos[key] }));

      console.log(arr_obj);
      
      this.addAutoMarkers(arr_obj);
    })
  }
  async getUserPosition() {

    console.log("Add map get user pos");
    
    let position = await Geolocation.getCurrentPosition();
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;

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

  }


  getOnDragEvent(vMarker: any) {
    google.maps.event.addListener(vMarker, 'dragend',
      (evt: any) => {


console.log(evt);
      })

  }

  addAutoMarkers(autos: any[]) {
    console.log(autos);
    for (let index = 0; index < autos.length; index++) {
      const element = autos[index];
      console.log(`Count location ${index}`);
      
      console.log(element['key']['location']);
      let latlng = new google.maps.LatLng(element['key']['location']['lat'], element['key']['location']['lng']);
      // console.log(Object.values(el)[0].location);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latlng,
        draggable: false,
        icon: '/assets/rikshaw.png',
        title: element['key']['mobile'],
        label: { color: '#121212', fontWeight: 'bold', fontSize: '10px', text: element['key']['email'] }
        //icon: ''
      });

      console.log(`marker ${index} added`);
      google.maps.event.addListener(marker, 'click',
      (evt: any) => {


        console.log(marker.getTitle());
        //open modal for from to and fares
        this.presentAutoModal(marker.getTitle());
      })
      
    }

    

  }
  async presentAutoModal(id:any) {
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
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      draggable: true,
      // icon: '/assets/rikshaw.png',
      label: { color: '#121212', fontWeight: 'bold', fontSize: '10px', text: 'YOU ARE HERE!' }
      //icon: ''
    });

    this.getOnDragEvent(marker);

    let content = "<p>Your Current Location</p>";
    this.getAllAutos();

  }
}
