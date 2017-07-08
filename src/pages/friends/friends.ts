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
    console.log('ionViewDidLoad FriendsPage');
    this.fetchFriends();
    console.log("this.friends",this.friends)

  }
  ionViewWillEnter() {
    console.log("ion view will enter")
    this.fetchFriends();
    console.log("this.friends",this.friends)

    console.log('this.fetchFriends() called?')
  }

  fetchFriends() {
    this.appUsersProvider.fetchFriends(window.localStorage.getItem("userId"), window.localStorage.getItem("token"))
      .subscribe(
        res => {
          console.log('friends', res);
          this.friends = res.friends
          // console.log(this.friends[0].firstName)
        }, err => {
          console.log('err', err);
        }
      )
  }
  toFriendsTripsPage(friendId) {
    this.navCtrl.push(TripsPage, {friendId: friendId, mode: "Friend"});
  }

}
