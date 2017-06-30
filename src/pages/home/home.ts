import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
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
    console.log(this.loginForm.value)
    if (!this.loginForm.valid) {
      alert("Please enter a valid email and password");
    }
    console.log('loginFormValue', this.loginForm.value);
    this.appUsersProvider.login(this.loginForm.value)
      .subscribe(
        user => {
          window.localStorage.setItem("userId", user.userId);
          window.localStorage.setItem("token", user.id);
          console.log('user', user);
        }, err => {
          console.log('err', err);
        }
      )
  }
  toRegisterPage() {
    console.log('to register page')
    this.navCtrl.push(RegisterPage);
  }

}
