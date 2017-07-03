import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TripsPage } from '../trips/trips';
import { TripsProvider } from '../../providers/trips/trips';

@IonicPage()
@Component({
  selector: 'page-new-trip',
  templateUrl: 'new-trip.html',
})
export class NewTripPage {
  newTripForm: FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private tripsProvider: TripsProvider) {
    this.newTripForm = this.formBuilder.group({
      location: ['', Validators.required],
      // travelers: [[]],
      date: ['', Validators.required],
      info: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTripPage');
  }
  createTrip() {
    let tripDataWithUserId: any = this.newTripForm.value;
    tripDataWithUserId["userId"] = window.localStorage.getItem("userId");
    console.log(tripDataWithUserId);
    this.tripsProvider.createTrip(tripDataWithUserId, window.localStorage.getItem("token"))
      .subscribe(
        trip => {
          console.log(trip);
          this.navCtrl.popTo(TripsPage);
        }, err => {
          console.log(err);
        }
      )
  }

}
