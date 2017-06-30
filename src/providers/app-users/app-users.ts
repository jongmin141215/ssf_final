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
}
