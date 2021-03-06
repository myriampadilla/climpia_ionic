import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SolicitudesProvider } from './../../providers/solicitudes/solicitudes'
import { DominiosProvider} from './../../providers/dominios/dominios';
import { UsuariosProvider} from './../../providers/usuarios/usuarios';

/**
 * Generated class for the EditarSolicitudPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-solicitud',
  templateUrl: 'editar-solicitud.html',
})
export class EditarSolicitudPage {

  	solicitud:any;
    dom_tipo_material:any;
    dom_unidad_medida:any;

  	constructor(
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
	  	private _solicitudes: SolicitudesProvider,
      private _dominios:DominiosProvider,
      private _usuarios:UsuariosProvider
  	) {
 	  	this.solicitud={
          numero_solicitud:"",
          fecha_solicitud:"",
          estado:"",
          fecha_cambio_estado:"",
          id_tipo_material:"",
          id_unidad_medida:"",
          cantidad:"",
          observaciones:"",
          cliente_id:"",
          id_ultimo_servicio:""
   	   }
    this.dom_tipo_material={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    }
    this.dom_unidad_medida={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    }

    console.log('EditarSolicitudPage.constructor');
 	}

  ionViewCanEnter(){  
    return this._usuarios.isAuthenticate();
  }

	ionViewDidLoad() {
	console.log('ionViewDidLoad EditarSolicitudPage');
  //==============================
  this.traer_dom_tipo_material (3);
  this.traer_dom_unidad_medida (4);
  //==============================
	this._solicitudes.
	    	showSolicitud(this.navParams.get('id'),localStorage.getItem("SessionToken")).
	    	subscribe(respuestaSolicitud=>{
	    		this.solicitud=respuestaSolicitud;
	    	});
	}

	editarSolicitud(){
		this._solicitudes.
			updateSolicitud(this.solicitud,localStorage.getItem("SessionToken")).
			subscribe(respuesta=>{
				this.navCtrl.push('VerSolicitudPage',{id:this.solicitud.id});
			});
	}

  regresar () {
    this.navCtrl.pop();  
  }

  traer_dom_tipo_material (idparametro){
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dom_tipo_material=respuestaDominio;
    });
  } // fin-traerDominio
 
  traer_dom_unidad_medida (idparametro){
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dom_unidad_medida=respuestaDominio;
    });
  } // fin-traerDominio
     
}
