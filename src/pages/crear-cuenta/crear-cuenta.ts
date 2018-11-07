import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { AlertController } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs'
import { DominiosProvider} from './../../providers/dominios/dominios';


/**
 * Generated class for the CrearCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html',
})
export class CrearCuentaPage {

  formulario:any;
  dominio: any;

  
  constructor(
  		public navCtrl: NavController, 
	  	public navParams: NavParams, 
	  	private _usuarios:UsuariosProvider, 
	  	private alertCtrl:AlertController,
	  	private _dominios:DominiosProvider
  ) 
  {
  	this.formulario={
  		usuario:{
  			username: "",
  			email: "",
  			password: "",
  			password_confirmation: "",
  			id_tipo_usuario:""
  		}
  	 }
    this.dominio={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    }
    console.log('constructor');
    this.traerDominio(1);    
  }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearCuentaPage');
  }

  crearCuenta(){
      this._usuarios.signUpUsuario(this.formulario).subscribe(usuario=>{
        let auth={
          auth:
          {
            email:this.formulario.usuario.email,
            password:this.formulario.usuario.password
          }
        };

        this.navCtrl.push('IniciarSesionPage');
      },error=>{
        console.log(error);
      });
  }

	iniciarSesion(auth){
		this._usuarios.signInUsuario(auth).subscribe(autenticacion=>{
			localStorage.setItem("SessionToken",autenticacion.jwt);
			let alert = this.alertCtrl.create({
				title: 'Bienvenido',
				subTitle: 'Gracias por crear tu cuenta',
				buttons: ['OK']
			});
		    alert.present();

			this.navCtrl.setRoot (TabsPage);
			this.navCtrl.popToRoot();  			
	  	});
	}

	salir() {
      this.navCtrl.setRoot (TabsPage);
      this.navCtrl.popToRoot();  
    }

  traerDominio (idparametro){
    console.log('traerDominio '+idparametro);
    localStorage.setItem("SessionToken",null);
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dominio=respuestaDominio;
    });
  } // fin-traerDominio


}
