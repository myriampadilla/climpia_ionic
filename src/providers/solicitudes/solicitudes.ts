import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the SolicitudesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class SolicitudesProvider {
    private url:string="http://localhost:3000/solicituds"
      
    constructor(public http: HttpClient) {
       console.log('Hello SolicitudesProvider Provider');
    }

  	encabezados(token){
		let encabezados:any;
		return encabezados={headers: new HttpHeaders({
	  		'Content-Type': 'application/json',
	  		'Authorization': token
  		})};
	}

  	/*Traer todos las solicitudes*/
	getSolicitudes(token):Observable<any>{
 	    let urlSolicitud=this.url;
		return this.http.get<any>(urlSolicitud,this.encabezados(token));
	}

	/*Traer una solicitud*/
	showSolicitud(id, token):Observable<any>{	  	
	  	let urlSolicitud=this.url+"/"+id;
	  	return this.http.get<any>(urlSolicitud,this.encabezados(token));
	}

	/*Crear una solicitud*/
	createSolicitud(solicitud,token){
	  	let params= JSON.stringify(solicitud);
	  	return this.http.post<any>
	  		(this.url,params,this.encabezados(token));
	}

	/*Editar una solicitud*/
	updateSolicitud(solicitud,token){
	  	let urlSolicitud=this.url+'/'+solicitud.id;
	  	let params=JSON.stringify(solicitud);
	  	return this.http.put<any>
	  		(urlSolicitud,params,this.encabezados(token));
	}

	/*Elminar una solicitud - desistir*/
	deleteSolicitud(id,token):Observable<any>{
	  	let urlSolicitud=this.url+'/'+id;
	  	return this.http.delete<any>(urlSolicitud,
	  		this.encabezados(token));
	}
}


