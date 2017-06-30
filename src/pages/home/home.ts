import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private loginForm: FormGroup;
  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder) {
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
  }
  toRegisterPage() {
    console.log('to register page')
    this.navCtrl.push(RegisterPage);
  }

}
