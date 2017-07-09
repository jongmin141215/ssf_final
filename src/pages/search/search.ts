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
  ionViewWillEnter() {
    if (this.navParams.get("friends")) {
      this.friends = this.navParams.get("friends");
    }
  }

  findFriend() {
    this.appUsersProvider.search(this.searchForm.value.searchTerm, window.localStorage.getItem("token"))
      .subscribe(
        friend => {
          if (this.navParams.get('username') === friend.username) {
            alert("You cannot add yourself to your friend list")
            this.searchForm.reset();
          } else {
            this.searchForm.reset();
            this.friend = friend;
          }
        },
        err => {
          if (err.statusText == "Not Found") {
            alert("Username doesn't exist");
          } else {
            alert("Something went wrong. Please try again.");
          }
          this.searchForm.reset();
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
      this.appUsersProvider.addFriend(window.localStorage.getItem("userId"), this.friends, window.localStorage.getItem("token"))
        .subscribe(
          res => {
            alert("Friend successfully added!")
            this.friend = undefined;
          }, err => {
            alert("Something went wrong. Please try again.")
          }
        )
    } else {
      alert(friend.username + " already exists.")
      this.friend = undefined;
    }
  }
}
