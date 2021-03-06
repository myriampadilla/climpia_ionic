import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SolicitudesProvider} from './../../providers/solicitudes/solicitudes';
import { TabsPage } from './../tabs/tabs'
import { UsuariosProvider} from './../../providers/usuarios/usuarios';

/**
 * Generated class for the TraerSolicitudesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-traer-solicitudes',
  templateUrl: 'traer-solicitudes.html',
})
export class TraerSolicitudesPage {

  solicitudes:Array<any>;
  solicitud={
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
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl:AlertController, 
    private _solicitudes:SolicitudesProvider,
    private _usuarios:UsuariosProvider,
    ) {}

  ionViewCanEnter(){    
    return this._usuarios.isAuthenticate();
  }

  ionViewDidLoad() {
     console.log('ionViewDidLoad TraerSolicitudesPage');
     this.traerSolicitudes();
  }

  traerSolicitudes(){
    this._solicitudes.
      getSolicitudes (localStorage.getItem("SessionToken")).
      subscribe(respuestaSolicitudes=>{
        this.solicitudes=respuestaSolicitudes;
      });

  }

  verSolicitud(id){
    this.navCtrl.push('VerSolicitudPage',{id:id});
  }

  nuevaSolicitud(){
    this.navCtrl.push('CrearSolicitudPage');
  }

  salir() {
      this.navCtrl.setRoot (TabsPage);
      this.navCtrl.popToRoot();  
  }
}


