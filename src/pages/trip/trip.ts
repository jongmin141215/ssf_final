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
  trip: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tripsProvider: TripsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripPage');
    console.log('data', this.navParams.data)
    console.log('trip', this.navParams.get('trip'))
    // this.trip = this.navParams.get('trip');
  }
  ngOnInit() {
    this.trip = this.navParams.get('trip');
  }
  toEditTripPage(trip) {
    this.navCtrl.push(NewTripPage, {mode: 'Edit', trip: trip});
  }
  deleteTrip(tripId) {
    this.tripsProvider.deleteTrip(tripId, window.localStorage.getItem('token'))
      .subscribe(
        res => {
          console.log('deleted?')
          console.log(res);
          this.navCtrl.popTo(TripsPage);
        }, err => {
          console.log(err);
        }
      )
  }
  convertDate(date) {
    let d = new Date(date);
    return new Date(d.setMinutes(d.getMinutes() + d.getTimezoneOffset()));
  }

}
