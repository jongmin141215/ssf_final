import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TripsProvider } from '../../providers/trips/trips';
import { TripsPage } from '../trips/trips';
import { NewTripPage } from '../new-trip/new-trip';

@IonicPage()
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html',
})
export class TripPage implements OnInit {
  userId: string;
  trip: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tripsProvider: TripsProvider) {
  }
  ionViewWillEnter() {
    this.userId = window.localStorage.getItem('userId');
  }
  ngOnInit() {
    this.trip = this.navParams.get('trip');
  }
  toEditTripPage(trip) {
    this.navCtrl.push(NewTripPage, {form: 'Edit', trip: trip});
  }
  deleteTrip(tripId) {
    this.tripsProvider.deleteTrip(tripId, window.localStorage.getItem('token'))
      .subscribe(
        res => {
          alert("Trip successfully deleted!")
          this.navCtrl.popTo(TripsPage, {mode: "Me"});
        }, err => {
          alert("Something went wrong. Please try again.")
        }
      )
  }
  convertDate(date) {
    let d = new Date(date);
    return new Date(d.setMinutes(d.getMinutes() + d.getTimezoneOffset()));
  }

}
