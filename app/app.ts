import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Bedroom} from './pages/bedroom/bedroom';
import {Bathroom} from './pages/bathroom/bathroom';
import {Diningroom} from './pages/diningroom/diningroom';
import {Studyroom} from './pages/studyroom/studyroom';
import {Drawingroom} from './pages/drawingroom/drawingroom';
import {Kitchen} from './pages/kitchen/kitchen';

@Component({
  templateUrl: 'build/app.html'
})
export class Cierra {
  @ViewChild(Nav) nav:Nav;
  rootPage: any = Bedroom;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
  	this.initializeApp();

  	// used for an example of ngFor and navigation
    this.pages = [
      { title: 'Bedroom', component: Bedroom },
      { title: 'Drawingroom', component: Drawingroom },
      { title: 'Studyroom', component: Studyroom},
      { title: 'Diningroom', component: Diningroom},
      { title: 'Kitchen', component: Kitchen},
      { title: 'Bathroom', component: Bathroom}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(Cierra);
