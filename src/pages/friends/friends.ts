import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppUsersProvider } from '../../providers/app-users/app-users';
import { TripsPage } from '../trips/trips';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  friends: any = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private appUsersProvider: AppUsersProvider) {
  }

  ionViewDidLoad() {
    this.fetchFriends();
  }
  ionViewWillEnter() {
    this.fetchFriends();
  }

  fetchFriends() {
    this.appUsersProvider.fetchFriends(window.localStorage.getItem("userId"), window.localStorage.getItem("token"))
      .subscribe(
        res => {
          this.friends = res.friends
        }, err => {
          alert("Something went wrong. Please try again.");
        }
      )
  }
  toFriendsTripsPage(friendId) {
    this.navCtrl.push(TripsPage, {friendId: friendId, mode: "Friend"});
  }

}
