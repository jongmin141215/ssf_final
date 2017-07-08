import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FriendsPage } from '../friends/friends';
import { SearchPage } from '../search/search';
import { TripsPage } from '../trips/trips';

import { AppUsersProvider } from '../../providers/app-users/app-users';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  friendsPage: any = FriendsPage;
  searchPage: any = SearchPage;
  tripsPage: any = TripsPage;
  tripsParams = {
    userId: window.localStorage.getItem("userId"),
    mode: "Me"
  }
  currentUser: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private appUsersProvider: AppUsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.appUsersProvider.getUser(window.localStorage.getItem("userId"), window.localStorage.getItem("token"))
      .subscribe(
        user => {
          this.currentUser = user
          console.log("CURENT USER", this.currentUser)
        }, err => {
          console.log(err);
        }
      )
  }

}
