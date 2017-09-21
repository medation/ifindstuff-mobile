import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { Storage } from '@ionic/storage';


import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { AboutPage } from '../pages/about/about';

import { UserData } from '../providers/user-data';

import { AuthProvider } from '../providers/auth/auth';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.html',
})

export class Application {

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Categories', component: TabsPage, icon: 'calendar' },
    { title: 'About', component: AboutPage, icon: 'information-circle' },
    
  ];
  loggedInPages: PageInterface[] = [
  ];
  loggedOutPages: PageInterface[] = [
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    //public storage: Storage,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,

    private auth: AuthProvider

  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      auth.user.first().subscribe((user) => {
        if (user === null) {
          this.rootPage = 'auth-signin';
          this.enableMenu(false);
        }
      });

    });

    // Check if the user has already seen the tutorial
    this.userData.checkHasSeenTutorial().then((hasSeenTutorial) => {
      if (hasSeenTutorial === null) {
        // User has not seen tutorial
        this.rootPage = TutorialPage;
      } else {
        this.rootPage = 'auth-signin';
        
      }
    });


   

  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

 

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

}


