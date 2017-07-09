import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NewTripPage } from '../new-trip/new-trip';
import { TripPage } from '../trip/trip';
import { TripsProvider } from '../../providers/trips/trips';

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  trips: any;
  mode: string = "Me";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tripsProvider: TripsProvider) {
  }
  ionViewDidLoad() {
    this.fetchTrips(window.localStorage.getItem("userId"))
  }
  ionViewWillEnter() {
    this.mode = this.navParams.get("mode");
    if (this.mode === "Me") {
      this.fetchTrips(window.localStorage.getItem("userId"))
    } else if (this.mode === "Friend") {
      this.fetchTrips(this.navParams.get("friendId"))
    }
  }
  fetchTrips(id) {
    this.tripsProvider.getTrips(id, window.localStorage.getItem("token"))
      .subscribe(
        trips => {
          this.trips = trips;
        }, err => {
          alert("Something went wrong. Please try again.");
        }
      )
  }
  toNewTripPage() {
    this.navCtrl.push(NewTripPage, {form: "New"});
  }
  toTripPage(trip) {
    this.navCtrl.push(TripPage, {trip: trip});
  }
  convertDate(date) {
    let d = new Date(date);
    return new Date(d.setMinutes(d.getMinutes() + d.getTimezoneOffset()));
  }

}
