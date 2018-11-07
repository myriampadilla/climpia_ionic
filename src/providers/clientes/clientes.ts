import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the ClientesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientesProvider {

  private url:string="http://localhost:3000/clientes"

  constructor(public http: HttpClient) {
    console.log('Hello ClientesProvider Provider');
  }

  	encabezados(token){
		let encabezados:any;
		return encabezados={headers: new HttpHeaders({
	  		'Content-Type': 'application/json',
	  		'Authorization': token
  		})};
	}

  	/*Traer todos los clientes*/
	getClientes(token):Observable<any>{
		return this.http.get<any>(this.url,this.encabezados(token));
	}

	  /*Traer un cliente*/
	showCliente(id, token):Observable<any>{	  	
	  	let urlCliente=this.url+"/"+id;
	  	/* get http://localhost:3000/clientes/1 */
	  	return this.http.get<any>(urlCliente,this.encabezados(token));
	}

	  /*Crear un cliente*/
	createCliente(cliente,token){
	  	let params= JSON.stringify(cliente);
	  	return this.http.post<any>
	  		(this.url,params,this.encabezados(token));
	}

    /*Editar un cliente*/
	updateCliente(cliente,token){
	  	//put http://localhost:3000/clientes/:id
	  	let urlCliente=this.url+'/'+cliente.id;
	  	let params=JSON.stringify(cliente);
	  	return this.http.put<any>
	  		(urlCliente,params,this.encabezados(token));
	}

    /*Elminar un cliente*/
	deleteCliente(id,token):Observable<any>{
	  	let urlCliente=this.url+'/'+id;
	  	return this.http.delete<any>(urlCliente,this.encabezados(token));
	}

}
