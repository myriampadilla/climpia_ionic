import { TabsPage } from './../tabs/tabs'
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClientesProvider } from './../../providers/clientes/clientes';

/**
 * Generated class for the ClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {
  formulario:any;
  idCliente:number;
 
 constructor(
  		public navCtrl: NavController, 
	  	public navParams: NavParams, 
	  	private _clientes:ClientesProvider, 
	  	private alertCtrl:AlertController
  	) {
  	this.formulario={
  		cliente:{
  		   id: "",
           puntos_por_redimir: "",
           puntos_redimidos: "",
           tipo_identificacion: "",
           numero_identificacion: "",
           primer_nombre: "",
           segundo_nombre: "",
           primer_apellido: "",
           segundo_apellido: "",
           numero_telefonico: "",
           correo_electronico: "",
           direccion: ""
  		}
  		
  	};
  }
    
  ionViewDidLoad() {
  	this.idCliente=this.navParams.get('id');
    console.log('ionViewDidLoad ClientePage');
    this.verCliente();
  }

  verCliente(){
    this._clientes.
    	showCliente(this.idCliente,localStorage.getItem("SessionToken")).
    	subscribe(respuestaCliente=>{
    		this.formulario.cliente=respuestaCliente;
    });
  }

  modificarCliente(){
	this._clientes.
	updateCliente(this.formulario.cliente,localStorage.getItem("SessionToken")).
	subscribe(respuesta=>{
    	this.navCtrl.push('ClientePage',{id:this.formulario.cliente.id});
	});
	let alert = this.alertCtrl.create({
		title: '',
		subTitle: 'Cliente actualizado',
		buttons: ['OK']
	});
	alert.present();

  }

  traerSolicitudes() {
      this.navCtrl.push('TraerSolicitudesPage');
   }

  salir() {
      this.navCtrl.setRoot (TabsPage);
      this.navCtrl.popToRoot();  
   }

}
