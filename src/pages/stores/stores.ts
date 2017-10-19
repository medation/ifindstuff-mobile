import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {ActionSheet, ActionSheetController, AlertController, App, ModalController, NavController } from 'ionic-angular';

// import moment from 'moment';
import { ProduitsPage } from '../produits/produits';

import { StoresData } from '../../providers/stores-data';
import { UserData } from '../../providers/user-data';
import { Utility } from '../../providers/utility';

import { RestService } from '../../services/rest.service';


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
    public user: UserData,
    public utility: Utility,
    public actionSheetCtrl: ActionSheetController,
    public restService: RestService
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

    this.restService.getStores().subscribe(data => {
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

}
