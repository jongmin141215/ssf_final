import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { FriendsPage } from '../pages/friends/friends';
import { SearchPage } from '../pages/search/search';
import { TripsPage } from '../pages/trips/trips';
import { NewTripPage } from '../pages/new-trip/new-trip';
import { TripPage } from '../pages/trip/trip';
import { AppUsersProvider } from '../providers/app-users/app-users';
import { TripsProvider } from '../providers/trips/trips';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    TabsPage,
    FriendsPage,
    SearchPage,
    TripsPage,
    NewTripPage,
    TripPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    TabsPage,
    FriendsPage,
    SearchPage,
    TripsPage,
    NewTripPage,
    TripPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppUsersProvider,
    TripsProvider
  ]
})
export class AppModule {}
