import { TabsPage } from './../tabs/tabs'
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TransportadorsProvider }  from
       './../../providers/transportadors/transportadors';
import { DominiosProvider} from './../../providers/dominios/dominios';
import { UsuariosProvider} from './../../providers/usuarios/usuarios';

/**
 * Generated class for the TransportadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transportador',
  templateUrl: 'transportador.html'
})
export class TransportadorPage {
  formulario:any;
  idTransportador:number;
  dominioTipoIdentificacion: any;
  dominioEstadoTransportador: any;
  dominioTipoVehiculo: any;

 constructor(
  		public navCtrl: NavController, 
	  	public navParams: NavParams, 
      public alertCtrl:AlertController,
	  	private _transportadors:TransportadorsProvider, 
      private _dominios:DominiosProvider,
      private _usuarios:UsuariosProvider
  	) {

  	this.formulario={
  		transportador:{
          id: "", 
          estado: "",
          fecha_cambio_estado: "", 
          planificador_cambio_estado: "", 
          tipo_identificacion: "", 
          numero_identificacion: "", 
          primer_nombre: "",
          segundo_nombre: "", 
          primer_apellido:"",
          segundo_apellido: "", 
          numero_telefonico: "", 
          correo_electronico: "", 
          direccion: "", 
          tipo_vehiculo: "", 
          marca_vehiculo: "", 
          placa_vehiculo: "", 
          id_servicio_actual: ""  	
        }
  	};
    this.dominioTipoIdentificacion={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    };
    this.dominioEstadoTransportador={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    }
    this.dominioTipoVehiculo={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    }
  }

  ionViewCanEnter(){    
    return this._usuarios.isAuthenticate();
  }

  ionViewDidLoad() {
  	this.idTransportador=this.navParams.get('idTransportador');

    console.log('ionViewDidLoad TransportadorPage'+
      ' idTransportador:'+this.idTransportador);
    
    //================================
    this.traerTipoVehiculo (5);   
    this.traerTipoIdentificacion (6);  
    this.traerEstadoTransportador(7);  
    //=================================

    this.verTransportador();
  }

  verTransportador(){
    this._transportadors.
    	showTransportador(this.idTransportador,
    		localStorage.getItem("SessionToken")).
    	subscribe(respuestaTransportador=>{
    		this.formulario.transportador=respuestaTransportador;
    });
  }

  modificarTransportador(){

  // Mientras se implementa gestion estado  
  //1.por verificar, 2.activo, 3.inactivo, 4.penalizado

  this.formulario.transportador.estado = "2";
    
	this._transportadors.
	updateTransportador(this.formulario.transportador,
		localStorage.getItem("SessionToken")).
	subscribe(respuesta=>{
    	this.navCtrl.push('TransportadorPage',
    		{idTransportador:this.formulario.transportador.id});
	});
	let alert = this.alertCtrl.create({
		title: '',
		subTitle: 'Transportador actualizado',
		buttons: ['OK']
	});
	alert.present();

  }

  salir() {
      this.navCtrl.setRoot (TabsPage);
      this.navCtrl.popToRoot();  
  }

  tomarServicio () {
    if (this.formulario.transportador.tipo_identificacion == null ||
        this.formulario.transportador.numero_identificacion == null ||
        this.formulario.transportador.primer_nombre == null ||
        this.formulario.transportador.primer_apellido == null ||
        this.formulario.transportador.numero_telefonico == null ||
        this.formulario.transportador.correo_electronico == null ||
        this.formulario.transportador.direccion == null ||
        this.formulario.transportador.tipo_vehiculo == null ||
        this.formulario.transportador.marca_vehiculo == null ||
        this.formulario.transportador.placa_vehiculo == null
       ) {
       //==================================
       let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Por favor registre la informacion completa y Grabe',
          buttons: ['OK']
       });
       alert.present();
       return;
       //==================================
    }
    
    //+++++++++++++++++++++++++++++++++++++++
    if (this.formulario.transportador.id_servicio_actual == null &&
        this.formulario.transportador.estado == 2) {
        this.navCtrl.push('ListarSolicitudesPage',
           {idTransportador:this.formulario.transportador.id});
    }
    else {
      this.navCtrl.push('EditarServicioPage',
         {idServicio:this.formulario.transportador.id_servicio_actual
         });
    }
  }  // fin-tomarServicio

  traerTipoIdentificacion (idparametro){
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dominioTipoIdentificacion=respuestaDominio;
    });
  } // fin-traerTipoIdentificacion

  traerEstadoTransportador (idparametro){
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dominioEstadoTransportador=respuestaDominio;
    });
  } // fin-traerEstadoTransportador

  traerTipoVehiculo (idparametro){
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dominioTipoVehiculo=respuestaDominio;
    });
  } // fin-traerTipoVehiculo



}
