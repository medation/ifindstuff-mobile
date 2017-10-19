
import { Component } from '@angular/core';

import {ActionSheet, ActionSheetController, AlertController, App, ModalController, NavController } from 'ionic-angular';

// import moment from 'moment';

import { StoresPage } from '../stores/stores';
import { Categorie } from '../../models/categorie.model';
import { CategoriesData } from '../../providers/categories-data';
import { UserData } from '../../providers/user-data';
import { Utility } from '../../providers/utility';

import { RestService } from '../../services/rest.service';


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {


  address;
  actionSheet: ActionSheet;
  categories = [];

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public user: UserData,
    public utility: Utility,
    public actionSheetCtrl: ActionSheetController,
    public restService: RestService
  ) {

    //this.getCategories(null);
  }

  ionViewDidLoad() {
    this.app.setTitle('Categories');    
    this.updateHangout();
  }

  updateHangout() {
    //Show loading
    var loading = this.utility.getLoader();
    loading.present();

    this.restService.getCategories().subscribe(categories => this.categories = categories);

      //Hide loading
      setTimeout(function(){
        loading.dismiss();
      },1000);

    
  }


  goToStore(item) {
    let nav = this.app.getRootNav();
    nav.push(StoresPage, item);
  } 
  
  
}
