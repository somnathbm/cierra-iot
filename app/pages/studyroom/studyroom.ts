import {Component} from '@angular/core';
import {App, NavController, MenuController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/studyroom/studyroom.html'
})
export class Studyroom {
  constructor(public app: App, public navCtrl: NavController, public menu: MenuController) {
  	menu.enable(true);
  }

}