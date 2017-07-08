import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  addFriend(userId, friend, token) {
    console.log('provider app user add friend called')
    console.log('userId', userId)
    console.log('friend', friend)
    console.log('friend email', friend.email)
    console.log('token', token)


    return this.http.patch(this.baseUrl + this.path + "/" + userId + "?access_token=" + token, {"friends": [friend]}).map(res => res.json());
    // return this.http.post(this.baseUrl + this.path + '/update?[where][id]=' + userId + '&access_token=' + token, {"friends": ["1,2,4", friend]}).map(res => res.json());
  }
  fetchFriends(userId, token) {
    return this.http.get(this.baseUrl + this.path + "/" + userId + "?access_token=" + token)
      .map(res => res.json());
  }

}
