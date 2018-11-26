import { TabsPage } from './../tabs/tabs'
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the IniciarSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iniciar-sesion',
  templateUrl: 'iniciar-sesion.html'
})
export class IniciarSesionPage {

	formulario:any;
  
 	constructor(public alertCtrl: AlertController, 
  		public navCtrl: NavController, 
  		public navParams: NavParams, 
  		private usuarios:UsuariosProvider

      ) {
  		this.formulario={
  			auth:{
  				email:"",
  				password:""
  			},
  			usuario:{
     			id:"",
  	     		username: "",
  		    	email: "",
  			    id_tipo_usuario:""
  		    }
  		}
      console.log('IniciarSesionPage.constructor');
 	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad IniciarSesionPage');
	}

	iniciarSesion(){
		this.usuarios.signInUsuario(this.formulario).subscribe(autenticacion=>{
			localStorage.setItem("SessionToken",autenticacion.jwt);
			
			this.usuarios.showUsuario(0,autenticacion.jwt).
    	      subscribe(respuestaUsuario=>{
            this.formulario.usuario=respuestaUsuario; 
    	      this.navegar();
            });
			
		}, respuestaError=>{
			    let alert = this.alertCtrl.create({
			      title: 'Error',
			      subTitle: 'Usuario o contraseña incorrecto',
			      buttons: ['OK']
			    });
			    alert.present();

		});
	}

  navegar () {
    if (this.formulario.usuario.id_tipo_usuario == 1) {
        this.navCtrl.push('ClientePage',
            {id:this.formulario.usuario.id});
        return;
    }
    if (this.formulario.usuario.id_tipo_usuario == 2) {
        this.navCtrl.push('TransportadorPage',
            {idTransportador:this.formulario.usuario.id});
        return;
    }
    
    let alert = this.alertCtrl.create({
        title: 'Lo siento',
        subTitle: 'Opcion en construccion',
        buttons: ['OK']
      });
    alert.present();      
    
            
  } // fin-navegar

  salir (){
    this.navCtrl.setRoot (TabsPage);
    this.navCtrl.popToRoot();  
  }
  
}