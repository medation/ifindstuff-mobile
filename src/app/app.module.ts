import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Application } from './app.component';

import { AboutPage } from '../pages/about/about';
import { MapPage } from '../pages/map/map';
import { CategoriesPage } from '../pages/categories/categories';
import { StoresPage } from '../pages/stores/stores';
import { ProduitsPage } from '../pages/produits/produits';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ProduitDetailPage } from '../pages/produit-detail/produit-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';

//import { Storage } from '@ionic/storage';
import { UserData } from '../providers/user-data';
import { Utility } from '../providers/utility';

import { RestService } from '../services/rest.service';
import { Facebook } from '@ionic-native/facebook';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { FunctionsProvider } from '../providers/functions/functions';

const firebaseConfig = {
  apiKey: "AIzaSyCGHKhUU5b4CrJkkqOL9v2Wscujss69pFg",
  authDomain: "ifindstuff-fee37.firebaseapp.com",
  databaseURL: "https://ifindstuff-fee37.firebaseio.com",
  projectId: "ifindstuff-fee37",
  storageBucket: "ifindstuff-fee37.appspot.com",
  messagingSenderId: "407234609106"

};


@NgModule({
  declarations: [
    Application,
    AboutPage,
    MapPage,
    CategoriesPage,
    StoresPage,
    ProduitsPage,
    ProduitDetailPage,
    ItemDetailPage,
    TabsPage,
    TutorialPage,
    AutocompletePage
  ],
  imports: [BrowserModule ,HttpModule,
    IonicModule.forRoot(Application),
    IonicStorageModule.forRoot(),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Application,
    AboutPage,
    MapPage,
    CategoriesPage,
    StoresPage,
    ProduitsPage,
    ProduitDetailPage,
    ItemDetailPage,
    TabsPage,
    TutorialPage,
    AutocompletePage
  ],
  providers: [
    RestService,
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserData, 
    Utility,
    AuthProvider,
    DataProvider,
    FunctionsProvider,
    FunctionsProvider
  ]
})
export class AppModule { }

