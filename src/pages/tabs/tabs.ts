import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FriendsPage } from '../friends/friends';
import { SearchPage } from '../search/search';
import { TripsPage } from '../trips/trips';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
