import { TabsPage } from './../../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, LoadingController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../../providers/auth/auth';

@IonicPage({
  name: 'auth-signin'
})
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class Signin {
  form : FormGroup;
  hasError: boolean;
  errorMessage: string;
  
  constructor(
    private app: App,
    private navCtrl: NavController, 
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private auth: AuthProvider
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signInWithEmail() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
    .then(() => {
      loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
    }, (error) => {
      loading.dismiss();
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage = 'Email invalide.';
          break;
        case 'auth/wrong-password':
          this.errorMessage = 'Mot de passe incorrect.';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'Utilisateur non trouvé.';
          break;
        default:
          this.errorMessage = error;
          break;
      }
      this.hasError = true;
    });
  }

  signInWithFacebook() {
    this.auth.signInWithFacebook()
    .then(() => {
      this.navCtrl.setRoot(TabsPage);
    }, (error) => {
      console.log(error);
    });
  }

  navigateTo(page) {
    this.navCtrl.push(page);
  }
}
