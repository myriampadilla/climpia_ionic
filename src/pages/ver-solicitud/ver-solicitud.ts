import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SolicitudesProvider } from './../../providers/solicitudes/solicitudes';
import { ServiciosProvider } from './../../providers/servicios/servicios'
import { DominiosProvider } from './../../providers/dominios/dominios';
import { UsuariosProvider} from './../../providers/usuarios/usuarios';
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
  dominioEstadoSolicitud:any;
  dominioTipoVehiculo: any;
  servicio:any;
  estadoSolicitud: number;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public alrtCtrl:AlertController,
  	private _solicitudes:SolicitudesProvider,
    private _servicios:ServiciosProvider,
    private _dominios:DominiosProvider,
    private _usuarios:UsuariosProvider
    ) {
    this.dominioEstadoSolicitud={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    }
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
    this.dominioTipoVehiculo={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    }
    this.servicio={
         id:"", 
         tipo_vehiculo:"", 
         placa_vehiculo:"", 
         fecha_creacion_servicio:"", 
         fecha_hora_estimada_recoleccion:"", 
         recoleccion_efectiva_sn:"", 
         puntos_otorgados_cliente:"", 
         fecha_hora_recoleccion:"", 
         observaciones_calificacion:"", 
         nota_calificacion:"", 
         observaciones_informe:"",
         solicitud_id:"", 
         transportador_id:"",
       solicitud:[{
            id:"",
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
         }],
         transportador:[{
            id:"", 
            estado:"", 
            fecha_cambio_estado:"", 
            planificador_cambio_estado:"", 
            tipo_identificacion:"", 
            numero_identificacion:"", 
            primer_nombre:"", 
            segundo_nombre:"", 
            primer_apellido:"", 
            segundo_apellido:"", 
            numero_telefonico:"", 
            correo_electronico:"", 
            direccion:"", 
            tipo_vehiculo:"", 
            marca_vehiculo:"", 
            placa_vehiculo:"", 
            id_servicio_actual:""
         }]    
    }
   
    console.log('VerSolicitudPage.constructor');
  }
  
  ionViewCanEnter(){    
    return this._usuarios.isAuthenticate();
  }

  ionViewDidLoad() {
  	console.log('ionViewDidLoad VerSolicitudPage');
  	this.idSolicitud=this.navParams.get('id');
    //=============================
    this.traer_dom_tipo_material (3);
    this.traer_dom_unidad_medida (4);
    this.traerTipoVehiculo (5);   
    this.traerEstadoSolicitud (2);
    //=============================
    this.verSolicitud();
  }

    verSolicitud(){
	    this._solicitudes.
	    	showSolicitud(this.idSolicitud,
          localStorage.getItem("SessionToken")).
	    	subscribe(respuestaSolicitud=>{
	    		this.solicitud=respuestaSolicitud;

          this.estadoSolicitud = respuestaSolicitud.estado;
          console.log('estadoSolicitud:'+this.estadoSolicitud);
         
          console.log('servicio:'+this.solicitud.id_ultimo_servicio);
          if (this.solicitud.id_ultimo_servicio != null) {
             this.verServicio();
          }
          
	    });
  }

  verServicio(){
    this._servicios.showServicio(this.solicitud.id_ultimo_servicio,
        localStorage.getItem("SessionToken")).
      subscribe(respuestaServicio=>{
        this.servicio=respuestaServicio;
      });
  }

  desistirSolicitud(){
      // 3-finalizada, 4-desistida
      if (this.estadoSolicitud == 3 ||
          this.estadoSolicitud == 4
        ) {
          return;
      }

      //Pendiente: Que pasa si la solicitud 
      // esta en estado 2 Asignada

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
      this.navCtrl.push('VerSolicitudPage',{id:this.idSolicitud});
  }

  editarSolicitud(){
      // 3-finalizada, 4-desistida
      if (this.estadoSolicitud == 3 ||
          this.estadoSolicitud == 4
        ) {
          return;
      }
      this.navCtrl.push('EditarSolicitudPage',{id:this.idSolicitud});
      
  }

  regresar() {
      this.navCtrl.push('TraerSolicitudesPage');
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

  traerEstadoSolicitud (idparametro){
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dominioEstadoSolicitud=respuestaDominio;
    });
  } // fin-traerEstadoSolicitud

  traerTipoVehiculo (idparametro){
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dominioTipoVehiculo=respuestaDominio;
    });
  } // fin-traerTipoVehiculo

}
