import {Component} from '@angular/core';
import {App, NavController, MenuController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/bathroom/bathroom.html'
})
export class Bathroom {
  constructor(public app: App, public navCtrl: NavController, public menu: MenuController) {
  	menu.enable(true);
  }

}
