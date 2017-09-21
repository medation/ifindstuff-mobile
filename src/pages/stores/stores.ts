import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {ActionSheet, ActionSheetController, AlertController, App, ModalController, NavController } from 'ionic-angular';

// import moment from 'moment';
import { ProduitsPage } from '../produits/produits';

import { StoresData } from '../../providers/stores-data';
import { UserData } from '../../providers/user-data';
import { Utility } from '../../providers/utility';



@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html'
})
export class StoresPage {

  stores = [];
  address;
  categories = [];
  actionSheet: ActionSheet;
  categorie : any;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public storesData: StoresData,
    public user: UserData,
    public utility: Utility,
    public actionSheetCtrl: ActionSheetController
  ) {

      this.categorie = navParams.data;
  }

  ionViewDidLoad() {
    this.app.setTitle('Stores');    
    this.updateHangout();
  }

  updateHangout() {
    //Show loading
    var loading = this.utility.getLoader();
    loading.present();

    this.storesData.getStores().subscribe(data => {
      this.stores = data;
      //Hide loading
      setTimeout(function(){
        loading.dismiss();
      },1000);

    });
  }


  goToProduit(item) {
    let nav = this.app.getRootNav();
    nav.push(ProduitsPage, { store : item, categorie : this.categorie });
  } 

   openShare(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + "TEST",
      buttons: [
        {
          text: 'Copy Link',
          handler: ($event) => {
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + "TEST");
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }
}
