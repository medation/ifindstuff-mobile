import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ViewChild, ElementRef } from '@angular/core';

import { Platform} from 'ionic-angular';

import { GoogleMap, GoogleMapsLatLng, GoogleMapsMarkerOptions } from 'ionic-native';

import { UserData } from '../../providers/user-data';
import { Utility } from '../../providers/utility';


import {ActionSheet, ActionSheetController, AlertController, App, ModalController} from 'ionic-angular';
declare var google: any;
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  
  item: any;
  produit : any;
  store : any;
  latLng: any;
  latitude : any;
  longitude : any;
  actionSheet: ActionSheet;

  @ViewChild('map') mapElement: ElementRef;
  // public map: GoogleMap;


  map: any;
  start = '';
  end = '';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController, navParams: NavParams,
                public user: UserData,
                public utility: Utility, 
                public actionSheetCtrl: ActionSheetController,
                public app: App,
                public modalCtrl: ModalController) {


      this.store = navParams.get('store');
      this.produit = navParams.get('produit');
      this.latitude = this.store.latitude;
      this.longitude = this.store.longitude;

      
};



ionViewDidLoad() {
      this.app.setTitle('Produit details'); 
      this.loadMapData ();
  }


loadMapData(){
    //Show loading

    this.latLng = new GoogleMapsLatLng(this.latitude, this.longitude)


    var loading = this.utility.getLoader();
    loading.present();
        let mapEle = this.mapElement.nativeElement;
        this.map = new google.maps.Map(mapEle, {
          center: this.latLng,
          zoom: 10
        });

        this.directionsDisplay.setMap(this.map);
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${this.store.nameStore}</h5> <h6>${this.produit.nameProduit} : ${this.produit.price} Dhs<h6>`
          });

          let marker = new google.maps.Marker({
            position: this.latLng,
            map: this.map,
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/kml/pal2/icon2.png',
            title: this.store.nameStore
          });

          marker.addListener('click', () => {
            infoWindow.open(this.map, marker);
          });

        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

    //}

    //Hide loading
      setTimeout(function(){
        loading.dismiss();
      },1000);
  }




}
