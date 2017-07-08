import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TripsProvider } from '../../providers/trips/trips';

@IonicPage()
@Component({
  selector: 'page-friend-trips',
  templateUrl: 'friend-trips.html',
})
export class FriendTripsPage {
  friendTrips: any;
  friendId: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tripsProvider: TripsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendTripsPage');
    this.friendId = this.navParams.get("friendId");
    console.log('friend id', this.friendId);
    this.tripsProvider.getTrips(this.friendId, window.localStorage.getItem("token"))
      .subscribe(
        trips => {
          this.friendTrips = trips;
        }, err => {
          console.log(err);
        }
      )

  }

}
