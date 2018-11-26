import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosProvider {
  private url:string="http://localhost:3000/servicios"

    constructor(public http: HttpClient) {
      console.log('Hello ServiciosProvider Provider');
    }
  
    encabezados(token){
		let encabezados:any;
		return encabezados={headers: new HttpHeaders({
	  		'Content-Type': 'application/json',
	  		'Authorization': token
  		})};
    }

    /*Traer todos los servicios*/
    getServicios(token):Observable<any>{
 	    let urlServicio=this.url;
		return this.http.get<any>(urlServicio,this.encabezados(token));
	}

	/*Traer un servicio*/
	showServicio(id, token):Observable<any>{	  	
	  	let urlServicio=this.url+"/"+id;
	  	return this.http.get<any>(urlServicio,this.encabezados(token));
	}

	/*Crear un servicio*/
	createServicio(servicio,token){
	  	let params= JSON.stringify(servicio);
	  	return this.http.post<any>
	  		(this.url,params,this.encabezados(token));
	}

	/*Editar un servicio*/
	updateServicio(servicio,token){
	  	let urlServicio=this.url+'/'+servicio.id;
	  	let params=JSON.stringify(servicio);
	  	return this.http.put<any>
	  		(urlServicio,params,this.encabezados(token));
	}

	/*Elminar un servicio*/
	deleteServicio(id,token):Observable<any>{
	  	let urlServicio=this.url+'/'+id;
	  	return this.http.delete<any>(urlServicio,
	  		this.encabezados(token));
	}
}


