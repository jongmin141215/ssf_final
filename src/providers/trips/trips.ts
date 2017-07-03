import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TripsProvider {

  constructor(public http: Http) {
    console.log('Hello TripsProvider Provider');
  }
  baseUrl: string = "http://localhost:3000/api";
  path: string = "/Trips"

  createTrip(tripData, token) {
    return this.http.post(this.baseUrl + this.path + "?access_token=" + token, tripData).map(res => res.json());
  }
  getTrips(userId, token) {
    return this.http.get(this.baseUrl + this.path + "?filter=%7B%22userId%22%3A%20%22" + userId + "%22%7D&access_token=" + token).map(res => res.json());
  }

}
