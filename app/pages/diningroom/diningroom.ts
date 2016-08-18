import {Component} from '@angular/core';
import {App, NavController, MenuController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/diningroom/diningroom.html'
})
export class Diningroom {
  constructor(public app: App, public navCtrl: NavController, public menu: MenuController) {
  	menu.enable(true);
  }

}