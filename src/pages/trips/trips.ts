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
    console.log('ionViewDidLoad TripsPage');
    this.tripsProvider.getTrips(window.localStorage.getItem("userId"), window.localStorage.getItem("token"))
      .subscribe(
        trips => {
          console.log('trips', trips);
          this.trips = trips;
        }, err => {
          console.log(err);
        }
      )
  }
  ionViewWillEnter() {
    this.mode = this.navParams.get("mode");
    if (this.mode === "Me") {
      this.tripsProvider.getTrips(window.localStorage.getItem("userId"), window.localStorage.getItem("token"))
        .subscribe(
          trips => {
            console.log('my trips', trips);
            this.trips = trips;
          }, err => {
            console.log(err);
          }
        )
    } else if (this.mode === "Friend") {
      this.tripsProvider.getTrips(this.navParams.get("friendId"), window.localStorage.getItem("token"))
        .subscribe(
          trips => {
            console.log('friend trips', trips);
            this.trips = trips;
          }, err => {
            console.log(err);
          }
        )
    }

  }
  toNewTripPage() {
    this.navCtrl.push(NewTripPage);
  }
  toTripPage(trip) {
    this.navCtrl.push(TripPage, {trip: trip});
  }

}
