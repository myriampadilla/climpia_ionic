import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs'
import { DominiosProvider} from './../../providers/dominios/dominios';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';

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
  dominioTipoUsuario: any;
  
  constructor(
  		public navCtrl: NavController, 
	  	public navParams: NavParams, 
	  	private alertCtrl:AlertController,
	  	private _dominios:DominiosProvider,
      private _usuarios:UsuariosProvider
  ) 
  {
  	this.formulario={
  		usuario:{
  			username: "",
        email:"",
  			password: "",
  			password_confirmation: "",
  			id_tipo_usuario:""
  		}
  	 }
    this.dominioTipoUsuario={
           id: "",
           id_valor: "",
           nombre_valor: "",
           valor_dominio:[{id:"", id_valor:"",nombre_valor:""}]
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearCuentaPage');
    // Hasta ahora va a crear la cuenta, 
    // por tanto no se verifica que este autenticado
    localStorage.setItem("SessionToken",null);
    this.traerTipoUsuario(1);   // tipo de usuario 
  }

  crearCuenta(){
    if (this.formulario.usuario.username == "" ||
        this.formulario.usuario.email == "" ||
        this.formulario.usuario.password == "" ||
        this.formulario.usuario.password_confirmation == "" ||
        this.formulario.usuario.id_tipo_usuario ==""
    ) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Por favor suministre toda la información',
        buttons: ['OK']
      });
        alert.present();
      return;
    }
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

  traerTipoUsuario (idparametro){
    this._dominios.showDominio(idparametro,
        localStorage.getItem("SessionToken")).
           subscribe(respuestaDominio=>{
               this.dominioTipoUsuario=respuestaDominio;
    });
  } // fin-traerTipoUsuario


}
