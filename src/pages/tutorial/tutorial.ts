import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController, public storage: Storage) {
    this.slides = [
      {
        title: 'Bienvenue à <b>IFINDSTUFF</b>',
        description: 'IFINDSTUFF va t\'aider à trouver ce à quoi tu cherches/as besoin.',
        image: 'assets/img/ica-slidebox-img-1.png',
      },
      {
        title: 'What is IFINDSTUFF?',
        description: 'Application mobile basé sur l\'api web ifindstuff ',
        image: 'assets/img/ica-slidebox-img-2.png',
      }
    ];
  }

  startApp() {
    this.navCtrl.push('auth-signin');
    this.storage.set('hasSeenTutorial', 'true');
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
