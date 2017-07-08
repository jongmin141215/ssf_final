import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Observer'

import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription'

@Injectable()
export class AppUsersProvider {

  constructor(public http: Http) {
    console.log('Hello AppUsersProvider Provider');
  }
  baseUrl: string = "http://localhost:3000/api";
  path: string = "/AppUsers";

  register(newUserData) {
    return this.http.post(this.baseUrl + this.path, newUserData).map(res => res.json());
  }
  login(loginData) {
    return this.http.post(this.baseUrl + this.path + '/login', loginData).map(res => res.json());
  }
  search(username, token) {
    return this.http.get(this.baseUrl + this.path + "/findOne?filter=%7B%22where%22%3A%20%7B%22username%22%3A%20%22" + username + "%22%7D%7D&access_token=" + token).map(res => res.json());
  }
  getUser(userId, token) {
    return this.http.get(this.baseUrl + this.path + "/" + userId + "?access_token=" + token).map(res => res.json());
  }
  addFriend(userId, newFriends, token) {
    return this.http.patch(this.baseUrl + this.path + "/" + userId + "?access_token=" + token, {"friends": newFriends}).map(res => res.json());
  }
  fetchFriends(userId, token) {
    return this.http.get(this.baseUrl + this.path + "/" + userId + "?access_token=" + token)
      .map(res => res.json());
  }

}
