import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CrearCuentaPage } from './../crear-cuenta/crear-cuenta';
import { IniciarSesionPage } from './../iniciar-sesion/iniciar-sesion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	login:boolean;
  
  constructor
  (public navCtrl: NavController, 
   public alertCtrl:AlertController
   ) {

  	if(localStorage.getItem('SessionToken')){
  		this.login=true;
  	} else{
  		this.login=false;
  	}

  }  

  irA(pagina){
  	this.navCtrl.push(pagina);
  }

  cerrarSesion(){
  	localStorage.removeItem('SessionToken');
  	this.login=false;
  }

}
