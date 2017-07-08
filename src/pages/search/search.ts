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
    this.appUsersProvider.addFriend(window.localStorage.getItem("userId"), friend, window.localStorage.getItem("token"))
      .subscribe(
        res => {
          alert("Friend successfully added!")
          console.log('res', res);
          alert(res);
        }, err => {
          console.log('err', err)
        }
      )
    // figure out why response is not being returned
    // this.navCtrl.parent.select(0)



  }



}
