import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { AppUsersProvider } from '../../providers/app-users/app-users'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private loginForm: FormGroup;
  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private appUsersProvider: AppUsersProvider) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.appUsersProvider.login(this.loginForm.value)
      .subscribe(
        user => {
          window.localStorage.setItem("userId", user.userId);
          window.localStorage.setItem("token", user.id);
          this.navCtrl.push(TabsPage);
        }, err => {
          alert("Invalid email or password");
        }
      )
  }
  toRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

}
