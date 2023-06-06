import { AutoFormPage } from './../auto-form/auto-form.page';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var google: any;

@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.page.html',
  styleUrls: ['./ambulance.page.scss'],
})
export class AmbulancePage implements OnInit {
  userId:any;

  isLocationPicked:any;
  flightPath: any;
  marker: any;
  Automarker: any;
  @ViewChild('map') mapView!: ElementRef;



  map: any;

  lat: any;
  lng: any;

  duration: any;
  distance: any;
  origin: any;
  destination: any;

  autos!: any[];
  isAuto: boolean = true;
  isEAuto: boolean = false;
  isAmbulance: boolean = false;
  isSchoolvan: boolean = false;
  isCrane: boolean = false;
  isbulldozer: boolean = false;

  postTransactionSub!: Subscription;
  constructor(private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private http: HttpClient) {
      this.userId = this.activatedRoute.snapshot.paramMap.get("userId");
      this.lat = this.activatedRoute.snapshot.paramMap.get("lat");
      this.lng = this.activatedRoute.snapshot.paramMap.get("lng");
      this.presentLoading();
      setTimeout(() =>{
        this.loadingController.dismiss();
      this.addMap(this.lat, this.lng);

      },5000);
  }

  ngOnInit() {
    // this.getUserPosition();

  }



  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }
  getAllAutos() {
    this.http.get(environment.URL+`/vehicles/nearMe/${this.lat}/${this.lng}/AMBULANCE`)
    .subscribe({
      next:(autos:any) =>{
        console.log(autos['result']);
        this.addAutoMarkers(autos['result']);

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




  async presentAutoModal(id:any) {
    const modal = await this.modalController.create({
    component: AutoFormPage,
    componentProps: { id: id }
    });
  
    await modal.present();
  
  }

  addAutoMarkers(autos: any[]) {
    console.log(autos);
    for (let index = 0; index < autos.length; index++) {
      const element = autos[index];
      console.log(`Count location ${autos.length}`);

      console.log(element);

      if (element['coordinates'].length == 2) {
        let contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +

          '<div style="color: black;" class="firstHeading" id="bodyContent">' +
          element['Category'] +
          
          "<br />" +
          element['Rates'] +"/RS"+

          `<p class='calculate' id='${element['coordinates']}'><a href="tel:+91${element['VehiclesOwnerId']['MobileNumber']}">` +
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
          title: element['VehiclesOwnerId'].toString(),
          label: { color: '#FF0B0B', fontWeight: 'bold', fontSize: '10px', text: element['Category'] }
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
        google.maps.event.addListener(infowindow, 'domready', () => {

          //Handle Click event on Call button in Info Window
          document.querySelectorAll('.calculate').forEach((el) => el.addEventListener("click", () => {
            console.log(el)
            let id = el.id.toString().split(',');
            console.log(id);
            let lat = id[0];
            let lng = id[1];
            let destination = new google.maps.LatLng(lat, lng);


            let polyLinejoiningPathPoints = [
              this.origin,
              destination
            ]
            const lineSymbol = {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            };
            this.flightPath = new google.maps.Polyline({
              path: polyLinejoiningPathPoints,
              icons: [
                {
                  icon: lineSymbol,
                  offset: "100%",
                },
              ],
              geodesic: true,
              // strokeColor: "#FF0000",
              // strokeOpacity: 1.0,
              // strokeWeight: 2,
            });





            this.flightPath.setMap(this.map);

            //Distaance Matrix Code Below
            this.CreateTransaction(destination, this.Automarker.getTitle());

            google.maps.event.addListener(this.flightPath, 'click',
              (evt: any) => {
                console.log(evt);

                //open modal for from to and fares
                // this.presentAutoModal(this.Automarker.getTitle());
              })





          }));
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

  CreateTransaction(destination:any, partnerId:any){


    console.log(`USerId:- ${this.userId}`);
    console.log(`Partner Id:- ${partnerId}`);
    

   
    var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
              {
                origins: [this.origin],
                destinations: [destination],
                travelMode: 'DRIVING',
                avoidHighways: false,
                avoidTolls: false,
              }, (response: any, status: any) => {
                // See Parsing the Results for
                // the basics of a callback function.
                console.log(response['rows'][0]['elements'][0]['distance']['text']);
                console.log(response['rows'][0]['elements'][0]['duration']['text']);
                console.log(status);
                this.distance = response['rows'][0]['elements'][0]['distance']['text'];
                this.duration = response['rows'][0]['elements'][0]['duration']['text'];
                this.http.post(environment.URL+'/api/post/contactHistory',{
                  userId: this.userId,
                  partnerId: partnerId
                })
                .subscribe({
                  next:(value:any) =>{
                    console.log(value);
                    
                  },
                  error:(error) =>{
                    console.log(error);
                    
                  }
                })
              });

  }


  // async presentAutoModal(id: any) {
  //   let a = document.createElement("a");
  //   a.href = `tel: +91${id}`;
  //   a.click();
  //   // const modal = await this.modalController.create({
  //   // component: AutoFormPage,
  //   // componentProps: { id: id }
  //   // });

  //   // await modal.present();

  // }

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

    this.getOnDragEvent(this.marker);

    let content = "<p>Your Current Location</p>";
    this.getAllAutos();

  }

}
