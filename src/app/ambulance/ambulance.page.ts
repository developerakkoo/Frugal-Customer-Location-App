import { AutoFormPage } from './../auto-form/auto-form.page';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

declare var google: any;

@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.page.html',
  styleUrls: ['./ambulance.page.scss'],
})
export class AmbulancePage implements OnInit {
  @ViewChild('map') mapView!: ElementRef;
  // @ViewChild('mapeauto') eautoView!: ElementRef;
  // @ViewChild('mapambulance') ambulanceView!: ElementRef;
  // @ViewChild('mapcrane') craneView!: ElementRef;
  // @ViewChild('mapbulldozer') bulldozerView!: ElementRef;
  // @ViewChild('mapschoolvan') schoolvanView!: ElementRef;


  map: any;

  lat: any;
  lng: any;

  autos!: any[];
  constructor(private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private http: HttpClient) {
    this.getAllAutos();
      
  }

  ngOnInit() {
    this.getUserPosition();

  }

  getAllAutos() {
    this.http.get(environment.URL+"/App/api/v1/get/vehicle")
    .subscribe({
      next:(autos:any) =>{
        console.log(autos);

      },
      error:(error) =>{
        console.log(error);
        
      }
      // var arr_obj = Object.keys(autos).map(key => ({ key: autos[key] }));
      // console.log(arr_obj);   
      // this.addAutoMarkers(arr_obj);
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
        icon: '/assets/auto.ico',
        title: element['key']['key'],
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
    const modal = await this.modalController.create({
    component: AutoFormPage,
    componentProps: { id: id }
    });
  
    await modal.present();
  
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
