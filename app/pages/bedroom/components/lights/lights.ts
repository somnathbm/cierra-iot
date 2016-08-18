import {Component} from '@angular/core';
import {App, NavController, ViewController} from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/bedroom/components/lights/lights.html'
})
export class Lights {
	public isChecked: Boolean = true;
	constructor(public app: App, public navCtrl: NavController, public viewCtrl: ViewController) {

	}
	closeModal(){
		this.viewCtrl.dismiss();
	}
	switchChange(){
		if(this.isChecked){
			this.isChecked = false;
			alert("led swicthed off");
			return;
		}
		else{
			this.isChecked = true;
			alert("led switched on again");
			return;
		}
	}
}