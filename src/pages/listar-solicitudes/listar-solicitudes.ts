import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SolicitudesProvider} from './../../providers/solicitudes/solicitudes';
import { TabsPage } from './../tabs/tabs'
import { UsuariosProvider} from './../../providers/usuarios/usuarios';

/**
 * Generated class for the ListarSolicitudesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listar-solicitudes',
  templateUrl: 'listar-solicitudes.html'
})
export class ListarSolicitudesPage {

  solicitudes:Array<any>;
  idTransportador:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl:AlertController, 
    private _solicitudes:SolicitudesProvider,
    private _usuarios:UsuariosProvider
    ) {}


  ionViewCanEnter(){  
    return this._usuarios.isAuthenticate();
  }

  ionViewDidLoad() {
     this.idTransportador=this.navParams.get('idTransportador');
     console.log('ionViewDidLoad ListarSolicitudesPage'+
       ' idTransportador:'+this.idTransportador);
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
    this.navCtrl.push('VerSoltranspPage',
     {idTransportador:this.idTransportador,
      idSolicitud:id});
  }

  salir() {
      this.navCtrl.setRoot (TabsPage);
      this.navCtrl.popToRoot();  
  }
}


