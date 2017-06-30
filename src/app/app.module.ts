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
import { AppUsersProvider } from '../providers/app-users/app-users';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    TabsPage,
    FriendsPage,
    SearchPage,
    TripsPage
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
    TripsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppUsersProvider
  ]
})
export class AppModule {}
