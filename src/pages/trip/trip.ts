import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html',
})
export class TripPage implements OnInit {
  trip: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripPage');
    console.log('data', this.navParams.data)
    console.log('trip', this.navParams.get('trip'))
    // this.trip = this.navParams.get('trip');
  }
  ngOnInit() {
    this.trip = this.navParams.get('trip');

  }

}
