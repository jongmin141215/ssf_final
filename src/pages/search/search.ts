import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppUsersProvider } from '../../providers/app-users/app-users';
import { FriendsPage } from '../friends/friends';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  currentUser: any;
  friend: any;
  friends: any = [];
  private searchForm: FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private appUsersProvider: AppUsersProvider) {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  ionViewWillEnter() {
    if (this.navParams.get("friends")) {
      this.friends = this.navParams.get("friends");
    }
  }

  findFriend() {
    console.log(this.searchForm.value);
    this.appUsersProvider.search(this.searchForm.value.searchTerm, window.localStorage.getItem("token"))
      .subscribe(
        friend => {
          console.log('search user', friend);
          this.searchForm.reset();
          this.friend = friend;
        },
        err => {
          console.log(err);
        }
      )
  }
  addFriend(friend) {
    let tempFriends = [];
    this.friends.forEach( el => {
      tempFriends.push(JSON.stringify(el))
    })
    if (tempFriends.indexOf(JSON.stringify(friend)) === -1) {
      this.friends.push(friend);
    }
    this.appUsersProvider.addFriend(window.localStorage.getItem("userId"), this.friends, window.localStorage.getItem("token"))
      .subscribe(
        res => {
          alert("Friend successfully added!")
          console.log('res', res);
          alert(res);
        }, err => {
          console.log('err', err)
        }
      )
  }



}
