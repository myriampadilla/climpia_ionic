import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SolicitudesProvider } from './../../providers/solicitudes/solicitudes';
import {IniciarSesionPage} from './../iniciar-sesion/iniciar-sesion';
import { DominiosProvider} from './../../providers/dominios/dominios';

/**
 * Generated class for the CrearSolicitudPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-solicitud',
  templateUrl: 'crear-solicitud.html',
})
export class CrearSolicitudPage {

  solicitud:any;
  dom_tipo_material:any;
  dom_unidad_medida:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public _solicitudes:SolicitudesProvider,
    private _dominios:DominiosProvider
  	) {

  	this.solicitud={
        numero_solicitud:"",
        fecha_solicitud:"",
        estado:"1",
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
    console.log('CrearSolicitudPage.constructor');
    this.traer_dom_tipo_material (3);
    this.traer_dom_unidad_medida (4);
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearSolicitudPage');
  }

  crearSolicitud(){
    //solicitud.estado = 1 Pendiente recoleccion
   	this._solicitudes.
  		createSolicitud(this.solicitud,localStorage.getItem("SessionToken")).
  		subscribe(respuestaSolicitud=>{
  			this.navCtrl.setRoot('VerSolicitudPage',{id:respuestaSolicitud.id})
  			this.navCtrl.popToRoot()
  		});
  }
 traer_dom_tipo_material (idparametro){
    console.log('traerDominio '+idparametro);
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dom_tipo_material=respuestaDominio;
    });
  } // fin-traerDominio
 
  traer_dom_unidad_medida (idparametro){
    console.log('traerDominio '+idparametro);
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dom_unidad_medida=respuestaDominio;
    });
  } // fin-traerDominio
     
}

