import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiciosProvider } from './../../providers/servicios/servicios'
import { ClientesProvider } from './../../providers/clientes/clientes'
import { DominiosProvider } from './../../providers/dominios/dominios';
import { UsuariosProvider} from './../../providers/usuarios/usuarios';

/**
 * Generated class for the EditarServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-servicio',
  templateUrl: 'editar-servicio.html',
})
export class EditarServicioPage {

  servicio:any;
  dom_tipo_material:any;
  dom_unidad_medida:any;
  cliente:any;

  idServicio:any; 
 
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public alrtCtrl:AlertController,
    private _servicios:ServiciosProvider,
    private _clientes:ClientesProvider,  
    private _dominios:DominiosProvider,
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

    this.cliente={
               id:"", 
               tipo_identificacion:"", 
               numero_identificacion:"", 
               primer_nombre:"", 
               segundo_nombre:"", 
               primer_apellido:"", 
               segundo_apellido:"", 
               correo_electronico:"", 
               numero_telefonico:"", 
               direccion:"", 
               puntos_por_redimir:"", 
               puntos_redimidos:""
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
    
    console.log('EditarServicioPage.constructor');

  } // fin-Constructor


  ionViewCanEnter(){  
    return this._usuarios.isAuthenticate();
  }


  ionViewDidLoad() {
    this.idServicio=this.navParams.get('idServicio');

    console.log('ionViewDidLoad EditarServicioPage '+
      this.idServicio);   

    //================================
    this.traer_dom_tipo_material (3);
    this.traer_dom_unidad_medida (4);
    //================================
    
    this._servicios.
     	showServicio(this.idServicio,
    		localStorage.getItem("SessionToken")).
    	subscribe(respuestaServicio=>{
    		this.servicio=respuestaServicio;

        console.log('servicio.solicitud.id:'+
        this.servicio.solicitud.id);

        console.log('servicio.solicitud.cliente_id:'+
        this.servicio.solicitud.cliente_id);
    
        this._clientes.
          showCliente(this.servicio.solicitud.cliente_id,
          localStorage.getItem("SessionToken")).
          subscribe(respuestaCliente=>{
            this.cliente=respuestaCliente;

            console.log('correo_electronico:'+ 
             this.cliente.correo_electronico);
          });
 
    	});
   
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

  grabarFecha(){
	this._servicios.
		updateServicio(this.servicio,localStorage.getItem("SessionToken")).
		subscribe(respuesta=>{
      //**********
      let alert = this.alrtCtrl.create({
        title: '',
        subTitle: 'Fecha estimada recolección grabada',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push('TransportadorPage',
          {idTransportador:this.servicio.transportador.id});
      //**********
		});
  }

  regresar () {
   this.navCtrl.pop();  
  }

  finalizarSolicitud (){
        this.navCtrl.push('FinalizarServicioPage',
          {idServicio:this.servicio.id});
  } 
}
