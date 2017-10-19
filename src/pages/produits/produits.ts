import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {ActionSheet, ActionSheetController, AlertController, App, ModalController, NavController } from 'ionic-angular';

// import moment from 'moment';
import { ItemDetailPage } from '../item-detail/item-detail';
import { ProduitDetailPage } from '../produit-detail/produit-detail';

import { UserData } from '../../providers/user-data';
import { Utility } from '../../providers/utility';



@Component({
  selector: 'page-produits',
  templateUrl: 'produits.html'
})
export class ProduitsPage {

  produits = [];
  address;
  actionSheet: ActionSheet;
  store : any;
  categorie : any;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public user: UserData,
    public utility: Utility,
    public actionSheetCtrl: ActionSheetController
  ) {

    // this.store = navParams.data || 1;
    //  this.categorie = navParams.data || 0;
      this.store = navParams.get('store');
      this.categorie = navParams.get('categorie');
  }

  ionViewDidLoad() {
    this.app.setTitle('Produits');    
    this.updateHangout();
  }

  updateHangout() {
    //Show loading
    var loading = this.utility.getLoader();
    loading.present();

      this.produits = this.store.produit;

      //Hide loading
      setTimeout(function(){
        loading.dismiss();
      },1000);

  }

  goToDetail(item) {
    let nav = this.app.getRootNav();
    nav.push(ItemDetailPage, { produit : item, store : this.store });
  }

  goToDetailProduit(item) {
    let nav = this.app.getRootNav();
    nav.push(ProduitDetailPage, { produit : item, store : this.store, categorie : this.categorie });
  }

  presentActionSheet(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: item.nameProduit,
      buttons: [
        {
          text: 'Voir plus de détails',
          handler: () => {
            this.goToDetailProduit(item);
          }
        },{
          text: 'Voir position map',
          handler: () => {
            this.goToDetail(item);
          }
        },{
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  
}





