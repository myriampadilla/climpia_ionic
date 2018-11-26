import { TabsPage } from './../tabs/tabs'
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClientesProvider } from './../../providers/clientes/clientes';
import { DominiosProvider} from './../../providers/dominios/dominios';
import { UsuariosProvider} from './../../providers/usuarios/usuarios';

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
  dominioTipoIdentificacion: any;
 
 constructor(
  		public navCtrl: NavController, 
	  	public navParams: NavParams, 
	  	private _clientes:ClientesProvider, 
	  	private alertCtrl:AlertController,
      private _dominios:DominiosProvider,
      private _usuarios:UsuariosProvider
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
    this.dominioTipoIdentificacion={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    };
      
  }

  ionViewCanEnter(){  
    return this._usuarios.isAuthenticate();
  }
    
  ionViewDidLoad() {
  	this.idCliente=this.navParams.get('id');
    console.log('ionViewDidLoad ClientePage');
    //=====================
    this.traerTipoIdentificacion(6);  // tipo de identificacion
    //=====================
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
    if (this.formulario.cliente.tipo_identificacion  == null ||
        this.formulario.cliente.numero_identificacion == null ||
        this.formulario.cliente.primer_nombre == null ||
        this.formulario.cliente.primer_apellido == null ||
        this.formulario.cliente.numero_telefonico == null ||
        this.formulario.cliente.correo_electronico == null ||
        this.formulario.cliente.direccion == null
       ) {
       //==================================
       let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Por favor registre la informacion completa',
          buttons: ['OK']
       });
       alert.present();
       //==================================
       }
    else {      
      //==================================
      this.navCtrl.push('TraerSolicitudesPage');
      //==================================
    }
    
   }

  salir() {
      this.navCtrl.setRoot (TabsPage);
      this.navCtrl.popToRoot();  
   }

  traerTipoIdentificacion (idparametro){
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dominioTipoIdentificacion=respuestaDominio;
    });
  } // fin-traerTipoIdentificacion


}
