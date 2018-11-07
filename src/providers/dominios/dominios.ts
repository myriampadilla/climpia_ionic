import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the DominiosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DominiosProvider {

  private url:string="http://localhost:3000/dominios"


  constructor(public http: HttpClient) {
    console.log('Hello DominiosProvider Provider');
  }
  
  	encabezados(token){
		let encabezados:any;
		return encabezados={headers: new HttpHeaders({
	  		'Content-Type': 'application/json',
	  		'Authorization': token
  		})};
	}

	/*Traer un dominio */
	showDominio(id, token):Observable<any>{	  
	  	let urlDominio=this.url+"/"+id;
	  	console.log('showDominio '+urlDominio);
	  	return this.http.get<any>(urlDominio,
	  		this.encabezados(token));
	}


}
