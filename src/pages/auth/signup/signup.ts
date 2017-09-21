import { TabsPage } from './../../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, LoadingController, 
  ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../../providers/auth/auth';

@IonicPage({
  name: 'auth-signup'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  form : FormGroup;
  hasError: boolean;
  errorMessage: string;
  
  constructor(
    private app: App,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private auth: AuthProvider
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signUp() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.createUser(this.form.value.email, this.form.value.password).then(() => {
      loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
    }, (error) => {
      loading.dismiss();
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage = 'Email invalide.';
          break;
        case 'auth/weak-password':
          this.errorMessage = 'Le mot de passe doit contenir au minimun 6 caractère.';
          break;
        case 'auth/email-already-in-use':
          this.errorMessage = 'Email déja utilisé.';
          break;
        default:
          this.errorMessage = error;
          break;
      }
      this.hasError = true;
    });
  }
  
  navigatePop() {
    this.navCtrl.pop();
  }
}
