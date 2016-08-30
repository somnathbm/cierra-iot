import {Component} from '@angular/core';
import {App, NavController, ViewController} from 'ionic-angular';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	templateUrl: 'build/pages/bedroom/components/lights/lights.html'
})
export class Lights {
	public isChecked: Boolean = true;
	public isTuneLight: Boolean = false;
	public data: any;
	constructor(public app: App, public navCtrl: NavController, public viewCtrl: ViewController, public http: Http) {
	
	}
	closeModal(){
		this.viewCtrl.dismiss();
	}

	switchChange(){
		//console.log("hello");

		// // ajax send this data to nodeJS Express server via promise or observable ?????
		return this.http.get("lights.json", new RequestOptions({
			headers: new Headers({"Content-Type": "application/json"})
		}))
			.map((res: any) => res.json())
			.subscribe(data => {
				this.data = data.L;
				console.log(this.data);
			})
	}

	adjustAllChandelier(){
		if(! this.isTuneLight ){
			this.isTuneLight = true;
			return;
		}
		else{
			this.isTuneLight = false;
			return;
		}
	}
}