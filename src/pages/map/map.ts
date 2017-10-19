import { Component, ViewChild, ElementRef } from '@angular/core';

import { Platform, ModalController } from 'ionic-angular';

import { GoogleMap, GoogleMapsLatLng, GoogleMapsMarkerOptions } from 'ionic-native';

import {AutocompletePage} from '../autocomplete/autocomplete';
import { Utility } from '../../providers/utility';

import { RestService } from '../../services/rest.service';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  
  address;
  searchQuery: string = '';
  items: string[];
  stores = [];

  @ViewChild('mapCanvas') mapElement: ElementRef;
  public map: GoogleMap;

  constructor(public restService: RestService, public platform: Platform, public modalCtrl: ModalController, public utility: Utility,) {

    this.address = {
      place:{
        desc: '',
        lat: '',
        lng: ''
      } 
    };
  }

  ionViewDidLoad() {
    this.loadMapData ();
  }


  loadMapData(){
    //Show loading
    var loading = this.utility.getLoader();
    loading.present();

    if (this.platform.is('cordova') === true) {
      let mapEle = this.mapElement.nativeElement;
      this.restService.getStores().subscribe(mapData => {
        this.map = new GoogleMap('map_canvas');
        mapEle.classList.add('show-map');

        GoogleMap.isAvailable().then(() => {
          mapData.find(data => {
            const position = new GoogleMapsLatLng(43.074395, -89.381056);
            this.map.animateCamera({
              target: position,
              zoom: 16
            }).then(() => {
              mapData.forEach(markerData => {
                const markerOptions: GoogleMapsMarkerOptions = {
                  position: markerData,
                  title: markerData.name
                };

                this.map.addMarker(markerOptions);
              });
            });
          });
        });
      });
    } else {
      this.restService.getStores().subscribe(mapData => {
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: mapData.find(d => d.center),
          zoom: 16
        });

        mapData.forEach(markerData => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.nameStore}</h5>`
          });

          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/kml/pal2/icon2.png',
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      });
    }

    //Hide loading
      setTimeout(function(){
        loading.dismiss();
      },1000);
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      if(data == undefined) return;
      this.address.place = data;

      this.loadMapData ();

    });

    modal.present();
  }

}
