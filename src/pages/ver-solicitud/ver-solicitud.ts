import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DominiosProvider } from './../../providers/dominios/dominios';
import { SolicitudesProvider } from './../../providers/solicitudes/solicitudes';

/**
 * Generated class for the VerSolicitudPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-solicitud',
  templateUrl: 'ver-solicitud.html',
})
export class VerSolicitudPage {

  idSolicitud:number;
  solicitud:any;
  dom_tipo_material:any;
  dom_unidad_medida:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public _solicitudes:SolicitudesProvider,
  	public alrtCtrl:AlertController,
    private _dominios:DominiosProvider
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
   
    console.log('VerSolicitudPage.constructor');
    this.traer_dom_tipo_material (3);
    this.traer_dom_unidad_medida (4);

  }
  
    ionViewDidLoad() {
  	   console.log('ionViewDidLoad VerSolicitudPage');
  	   this.idSolicitud=this.navParams.get('id');
    
       this.verSolicitud();
    }

    verSolicitud(){
	    this._solicitudes.
	    	showSolicitud(this.idSolicitud,localStorage.getItem("SessionToken")).
	    	subscribe(respuestaSolicitud=>{
	    		this.solicitud=respuestaSolicitud;
	    });
  	}

  	desistirSolicitud(){
      //solicitud.estado = 4 Desistida
      this.solicitud.estado = '4';
  		let alert= this.alrtCtrl.create({
  			title: "Estas seguro?",
			buttons:[
		        {
		          text: 'Cancel',
		          handler: data => {
		            
		          }
		        },
		        {
		          text: 'Desistir',
		          handler: data => {
                this._solicitudes.
                  updateSolicitud(this.solicitud,localStorage.getItem("SessionToken")).
                  subscribe(respuesta=>{
                       this.navCtrl.push('TraerSolicitudesPage');
                });
	            }
		        }				
			]
  		});

  		alert.present();
  	}

  	editarSolicitud(){
      // 3-finalizada, 4-desistida
      if (this.solicitud.estado == "3" ||
          this.solicitud.estado == "4"
        ) {
          //nulo
      }
      else {
  	   	this.navCtrl.push('EditarSolicitudPage',{id:this.idSolicitud});
      }
  	}

    regresar() {
      this.navCtrl.push('TraerSolicitudesPage');
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
