import {Component} from '@angular/core';
import {App, NavController, MenuController, ModalController} from 'ionic-angular';
import {Lights} from './components/lights/lights';

@Component({
  templateUrl: 'build/pages/bedroom/bedroom.html'
})
export class Bedroom {
  constructor(public app: App, public navCtrl: NavController, public menu: MenuController, public modal: ModalController) {
  	menu.enable(true);
  }

  controlLights(){
  	let modalCtrlr = this.modal.create(Lights);
  	modalCtrlr.present();
  }

}