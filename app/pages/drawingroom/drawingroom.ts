import {Component} from '@angular/core';
import {App, NavController, MenuController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/drawingroom/drawingroom.html'
})
export class Drawingroom {
  constructor(public app: App, public navCtrl: NavController, public menu: MenuController) {
  	menu.enable(true);
  }

}