import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SolicitudesProvider } from './../../providers/solicitudes/solicitudes';
import { TransportadorsProvider }  from
       './../../providers/transportadors/transportadors';
import { ServiciosProvider } from './../../providers/servicios/servicios';
import { DominiosProvider } from './../../providers/dominios/dominios';
import { UsuariosProvider} from './../../providers/usuarios/usuarios';

/**
 * Generated class for the VerSoltranspPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-soltransp',
  templateUrl: 'ver-soltransp.html'
})
export class VerSoltranspPage {
  idSolicitud:number;
  idTransportador:number;
  solicitud:any;
  servicio:any;
  transportador:any;
  dom_tipo_material:any;
  dom_unidad_medida:any;
  dominioEstadoSolicitud: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public alrtCtrl:AlertController,
  	private _solicitudes:SolicitudesProvider,
  	private _transportadors:TransportadorsProvider,
    private _servicios:ServiciosProvider, 
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
        id_ultimo_servicio:"",
        cliente:[{
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
        }]
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
    this.transportador={
          id: "", 
          estado: "", 
          fecha_cambio_estado: "", 
          planificador_cambio_estado: "", 
          tipo_identificacion: "", 
          numero_identificacion: "", 
          primer_nombre: "", 
          segundo_nombre: "", 
          primer_apellido: "", 
          segundo_apellido: "", 
          numero_telefonico: "", 
          correo_electronico: "", 
          direccion: "", 
          tipo_vehiculo: "", 
          marca_vehiculo: "", 
          placa_vehiculo: "", 
          id_servicio_actual: ""    
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
          transportador_id:""
    }
    this.dominioEstadoSolicitud={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    }
    console.log('VerSoltranspPage.Constructor');
  }

  ionViewCanEnter(){    
    return this._usuarios.isAuthenticate();
  }

  ionViewDidLoad() {
    this.idSolicitud=this.navParams.get('idSolicitud');
    this.idTransportador=this.navParams.get('idTransportador');
    console.log('ionViewDidLoad VerSoltranspPage'+
      ' idSolicitud:'+this.idSolicitud+
      ' idTransportador:'+this.idTransportador);
    //====================================
    this.traer_dom_tipo_material (3);
    this.traer_dom_unidad_medida (4);
    this.traerEstadoSolicitud (6);
    //====================================

    this.verTransportador();
    this.verSolicitud();

    console.log('solicitud.cliente_id:'+
      this.solicitud.cliente_id);
    console.log('transportador:'+
          ' tipo_vehiculo:'+this.transportador.tipo_vehiculo+
          ' marca_vehiculo:'+this.transportador.marca_vehiculo+ 
          ' placa_vehiculo:'+this.transportador.placa_vehiculo); 
  }


  verSolicitud(){
    this._solicitudes.
    	showSolicitud(this.idSolicitud,localStorage.getItem("SessionToken")).
	    	subscribe(respuestaSolicitud=>{
	    		this.solicitud=respuestaSolicitud;
    });
  }

  verTransportador(){
    this._transportadors.
      showTransportador(this.idTransportador,
        localStorage.getItem("SessionToken")).
      subscribe(respuestaTransportador=>{
        this.transportador=respuestaTransportador;
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

  tomarSolicitud(){
  	//Confirme
  	//Crear servicio
  	//Actualizar solicitud.id_ultimo_servicio
  	//Actualizar transportador.id_servicio_actual
  	//Ir a pagina servicio a completar datos
    //En la pagina de servicio incluir botones:
    //   Finalizar solicitud,regresar
    //Cuando finalice la solicitud, no olvidar cambiar
    //    transportador.id_servicio_actual en ""
   	//this.navCtrl.push('EditarServicioPage',{idServicio:this.idServicio});

    this.crearServicio();
  }


  crearServicio(){
    this.servicio.tipo_vehiculo = this.transportador.tipo_vehiculo; 
    this.servicio.placa_vehiculo = this.transportador.placa_vehiculo; 
    this.servicio.solicitud_id = this.solicitud.id; 
    this.servicio.transportador_id = this.transportador.id;

    console.log('CrearServicio');
    this._servicios.
      createServicio(this.servicio,localStorage.getItem("SessionToken")).
      subscribe(respuestaServicio=>{

         this.solicitud.id_ultimo_servicio =
            respuestaServicio.id;
         this.actualizarSolicitud();

         this.transportador.id_servicio_actual =
            respuestaServicio.id;
         this.actualizarTransportador();

         this.navCtrl.push('EditarServicioPage',
            {idServicio:respuestaServicio.id
            });

    });
  }

  actualizarTransportador(){
     console.log('ActualizarTransportador');
     this._transportadors.
       updateTransportador(this.transportador,
       localStorage.getItem("SessionToken")).
       subscribe(respuesta=>{
       });

      console.log('Fin ActualizarTransportador');
  }

  actualizarSolicitud(){
     console.log('ActualizarSolicitud');
     this.solicitud.estado = 2; //asignada
    
     this._solicitudes.
       updateSolicitud(this.solicitud,
       localStorage.getItem("SessionToken")).
       subscribe(respuesta=>{
       });

      console.log('Fin ActualizarSolciitud');
  }

  regresar() {
    this.navCtrl.push('ListarSolicitudesPage');
  }

  traerEstadoSolicitud (idparametro){
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dominioEstadoSolicitud=respuestaDominio;
    });
  } // fin-traerEstadoSolicitud



}
