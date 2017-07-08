import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendTripsPage } from './friend-trips';

@NgModule({
  declarations: [
    FriendTripsPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendTripsPage),
  ],
  exports: [
    FriendTripsPage
  ]
})
export class FriendTripsPageModule {}
