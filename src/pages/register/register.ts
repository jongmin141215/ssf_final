import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppUsersProvider } from '../../providers/app-users/app-users';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private signupForm: FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private appUsersProvider: AppUsersProvider) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    console.log(this.signupForm.value)
    this.appUsersProvider.register(this.signupForm.value)
      .subscribe(
        user => {
          window.localStorage.setItem("userId", user.id);
          window.localStorage.setItem("token", user.token);
          this.navCtrl.setRoot(TabsPage);
          console.log(user);
        },
        err => {
          console.log(err);
        }
      )
  }

}
