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
  form: string = 'New';
  trip: any;
  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = this.currentDate.getMonth() + 1;
  date = this.currentDate.getDate();
  minStartDate = this.year + "-" + this.addZero(this.month) + "-" + this.addZero(this.date);
  minEndDate: any;
  maxEndDate = this.year + 1 + "-" + this.addZero(this.month) + "-" + this.addZero(this.date);
  addZero(date) {
    if (date < 10) {
      return "0" + date
    }
    return date;
  }
  newTripForm: FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private tripsProvider: TripsProvider) {
    this.newTripForm = this.formBuilder.group({
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      info: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTripPage');
  }
  ionViewWillEnter() {
    this.trip = this.navParams.get('trip');
    this.form = this.navParams.get('form')
    console.log("THIS TRIP!!!", this.trip);
    if (this.form === 'Edit') {
      this.newTripForm = this.formBuilder.group({
        location: [this.trip.location, Validators.required],
        startDate: [this.trip.startDate.substring(0, 10), Validators.required],
        endDate: [this.trip.endDate.substring(0, 10), Validators.required],
        info: [this.trip.info]
      })
    }
  }
  createTrip() {
    let tripDataWithUserId: any = this.newTripForm.value;
    tripDataWithUserId["userId"] = window.localStorage.getItem("userId");
    console.log(tripDataWithUserId);
    if (this.form === 'Edit') {
      tripDataWithUserId["tripId"] = this.trip.id
      this.tripsProvider.updateTrip(tripDataWithUserId, window.localStorage.getItem("token"))
      .subscribe(
        trip => {
          console.log('edit trip', trip);
          this.navCtrl.setRoot(TripsPage);
        }, err => {
          console.log(err);
        }
      )
    } else {
      this.tripsProvider.createTrip(tripDataWithUserId, window.localStorage.getItem("token"))
        .subscribe(
          trip => {
            console.log('new trip', trip);
            this.navCtrl.setRoot(TripsPage, { mode: "Me"});
          }, err => {
            console.log(err);
          }
        )
    }
  }

}
