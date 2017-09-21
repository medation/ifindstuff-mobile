import { Component } from '@angular/core';
import { NavController, NavParams, App, ModalController } from 'ionic-angular';
import {ViewChild} from '@angular/core';


import { Utility } from '../../providers/utility';



@Component({
  selector: 'page-produit-detail',
  templateUrl: 'produit-detail.html'
})
export class ProduitDetailPage {
  
  item: any;
  produit : any;
  store : any;
  categorie : any;

  



  constructor(   public navCtrl: NavController, 
                        navParams: NavParams,
                 public app: App,
                 public modalCtrl: ModalController,
                 public utility: Utility) {


      this.store = navParams.get('store');
      this.produit = navParams.get('produit');
      this.categorie = navParams.get('categorie');

      
};



ionViewDidLoad() {
      this.app.setTitle('Produit details'); 
  }


loadData(){
    
    var loading = this.utility.getLoader();
    loading.present();
        
    //Hide loading
    setTimeout(function(){
    loading.dismiss();
    },1000);
  }




}
