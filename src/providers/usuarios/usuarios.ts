import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

	private url:string="http://localhost:3000/"

	private httpHeaders={
        headers: new HttpHeaders({
        	'Content-Type': 'application/json'
        })
    };

  	constructor(public http: HttpClient, public alertCtrl:AlertController) {
    	console.log('Hello UsuariosProvider Provider');
  	}

    encabezados(token){
    let encabezados:any;
    return encabezados={headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })};
  }


  	signUpUsuario(usuario){
  		let params=JSON.stringify(usuario);
    	let urlCrearUsuario=this.url+"usuarios";
  		return this.http.post<any>(urlCrearUsuario,params,this.httpHeaders);
  	}

    signInUsuario(auth){
	    let params=JSON.stringify(auth);
      	let urlAutenticarUsuario=this.url+"usuario_token";
      	return this.http.post<any>(urlAutenticarUsuario,params,this.httpHeaders);
    }

    isAuthenticate(){
      if(localStorage.getItem("SessionToken")){
        return true;
      }else{
        let alert=this.alertCtrl.create({
          title: "Necesitas estar logueado",
          subTitle: "Por favor inicia sesión",
          buttons:['Ok']
        });
        alert.present();
        return false;
      }
    }
  
    /*Traer un usuario*/
    showUsuario(id, token):Observable<any>{      
      let urlUsuario=this.url+"usuarios/"+id;
      console.log('urlUsuario:'+urlUsuario); 
      /* get http://localhost:3000/usuarios/1 */
      return this.http.get<any>(urlUsuario,this.encabezados(token));
    }

}
