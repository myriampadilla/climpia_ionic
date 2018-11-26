import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ServiciosProvider } from './../../providers/servicios/servicios'
import { SolicitudesProvider } from './../../providers/solicitudes/solicitudes'
import { TransportadorsProvider }  from
       './../../providers/transportadors/transportadors';
import { UsuariosProvider} from './../../providers/usuarios/usuarios';

/**
 * Generated class for the FinalizarServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finalizar-servicio',
  templateUrl: 'finalizar-servicio.html',
})
export class FinalizarServicioPage {

  servicio:any;
  idServicio:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public alrtCtrl:AlertController,
    private _servicios:ServiciosProvider,
    private _solicitudes: SolicitudesProvider,
    private _transportadors:TransportadorsProvider,
    private _usuarios:UsuariosProvider
  	) {
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
 
  }

  ionViewCanEnter(){  
    return this._usuarios.isAuthenticate();
  }

  ionViewDidLoad() {
    this.idServicio=this.navParams.get('idServicio');
    console.log('ionViewDidLoad FinalizarServicioPage '+
        this.idServicio );
    //============================
    this._servicios.
     	showServicio(this.idServicio,
    		localStorage.getItem("SessionToken")).
    	subscribe(respuestaServicio=>{
    		this.servicio=respuestaServicio;

    	});
  }

  grabar(){
  if (this.servicio.recoleccion_efectiva_sn == "" ||
      this.servicio.fecha_hora_recoleccion == ""
    ) {
      let alert = this.alrtCtrl.create({
        title: '',
        subTitle: 'Por favor suministre información completa',
        buttons: ['OK']
      });
      alert.present();

      return;
  }


	this._servicios.
		updateServicio(this.servicio,localStorage.getItem("SessionToken")).
		subscribe(respuesta=>{
		//----------------------------------
	        console.log('FinalizarServicioPage.grabar solicitud_id: '+
            this.servicio.solicitud.id );
    	  
		    this.servicio.solicitud.estado = "3";
			this._solicitudes.
			updateSolicitud(this.servicio.solicitud,
				localStorage.getItem("SessionToken")).
			subscribe(respuesta=>{
				//********
	
	this.servicio.transportador.id_servicio_actual = null;			
    this._transportadors.
	updateTransportador(this.servicio.transportador,
		localStorage.getItem("SessionToken")).
	subscribe(respuesta=>{
    	this.navCtrl.push('TransportadorPage',
    		{idTransportador:this.servicio.transportador.id});
	});
	let alert = this.alrtCtrl.create({
		title: '',
		subTitle: 'Servicio finalizado',
		buttons: ['OK']
	});
	alert.present();
	this.navCtrl.push('TransportadorPage',
       {idTransportador:this.servicio.transportador.id});

				//********
	        });
			
		//----------------------------------
		});
  }
	
  regresar () {
   this.navCtrl.pop();  
  }

}
