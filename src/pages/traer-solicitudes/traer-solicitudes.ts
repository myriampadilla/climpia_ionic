import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsuariosProvider} from './../../providers/usuarios/usuarios';
import { ClientesProvider} from './../../providers/clientes/clientes';
import { SolicitudesProvider} from './../../providers/solicitudes/solicitudes';
import { TabsPage } from './../tabs/tabs'

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl:AlertController, 
    public _usuarios:UsuariosProvider,
    public _clientes:ClientesProvider,
    public _solicitudes:SolicitudesProvider,
    ) {}

  ionViewDidLoad() {
     console.log('ionViewDidLoad TraerSolicitudesPage');
     this.traerSolicitudes();
  }

  ionViewCanEnter(){    
    return this._usuarios.isAuthenticate();
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


