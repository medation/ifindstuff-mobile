import { Component } from '@angular/core';

import {ActionSheet, ActionSheetController, AlertController, App, ModalController, NavController } from 'ionic-angular';

// import moment from 'moment';

import { StoresPage } from '../stores/stores';

import { CategoriesData } from '../../providers/categories-data';
import { UserData } from '../../providers/user-data';
import { Utility } from '../../providers/utility';



@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {

  categories = [];
  address;
  actionSheet: ActionSheet;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public categoriesData: CategoriesData,
    public user: UserData,
    public utility: Utility,
    public actionSheetCtrl: ActionSheetController
  ) {

    this.address = {
      place:{
        desc: '',
        lat: '',
        lng: ''
      } 
    };
  }

  ionViewDidLoad() {
    this.app.setTitle('Categories');    
    this.updateHangout();
  }

  updateHangout() {
    //Show loading
    var loading = this.utility.getLoader();
    loading.present();

    this.categoriesData.getCategories().subscribe(data => {
      this.categories = data;

      //Hide loading
      setTimeout(function(){
        loading.dismiss();
      },1000);

    });
  }


  goToStore(item) {
    let nav = this.app.getRootNav();
    nav.push(StoresPage, item);
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
