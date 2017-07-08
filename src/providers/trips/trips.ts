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
  updateTrip(tripData, token) {
    return this.http.patch(this.baseUrl + this.path + "/" + tripData['tripId'] + "?access_token=" + token, tripData)
  }
  getTrips(userId, token) {
    return this.http.get(this.baseUrl + this.path + "?filter[where][userId]=" + userId + "&access_token=" + token).map(res => res.json());
  }
  deleteTrip(tripId, token) {
    return this.http.delete(this.baseUrl + this.path + '/' + tripId + "?access_token=" + token).map(res => res.json());
  }

}
