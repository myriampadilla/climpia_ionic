import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the TransportadorsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransportadorsProvider {

  private url:string="http://localhost:3000/transportadors"

  constructor(public http: HttpClient) {
    console.log('Hello TransportadorsProvider Provider');
  }

  	encabezados(token){
		let encabezados:any;
		return encabezados={headers: new HttpHeaders({
	  		'Content-Type': 'application/json',
	  		'Authorization': token
  		})};
	}

  	/*Traer todos los transportadores*/
	getTransportadors(token):Observable<any>{
		return this.http.get<any>(this.url,this.encabezados(token));
	}

	  /*Traer un transportador */
	showTransportador (id, token):Observable<any>{	  	
	  	let urlTransportador=this.url+"/"+id;
	  	/* get http://localhost:3000/transportador/1 */
	  	return this.http.get<any>(urlTransportador,
	  		this.encabezados(token));
	}

	  /*Crear un transportador*/
	createTransportador(transportador,token){
	  	let params= JSON.stringify(transportador);
	  	return this.http.post<any>
	  		(this.url,params,this.encabezados(token));
	}

    /*Editar un transportador*/
	updateTransportador(transportador,token){
	  	//put http://localhost:3000/transportadors/:id
	  	let urlTransportador=this.url+'/'+transportador.id;
	  	let params=JSON.stringify(transportador);
	  	return this.http.put<any>
	  		(urlTransportador,params,this.encabezados(token));
	}

    /*Elminar un transportador*/
	deleteTransportador (id,token):Observable<any>{
	  	let urlTransportador=this.url+'/'+id;
	  	return this.http.delete<any>
	  	(urlTransportador,this.encabezados(token));
	}

}
