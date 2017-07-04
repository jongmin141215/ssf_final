import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppUsersProvider } from '../../providers/app-users/app-users';

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
  addFriend(friendId) {
    this.appUsersProvider.addFriend(window.localStorage.getItem("userId"), friendId, window.localStorage.getItem("token"))
      .subscribe(
        res => {
          console.log('res', res);
          alert(res);
        }, err => {
          console.log('err', err)
        }
      )
  }



}
