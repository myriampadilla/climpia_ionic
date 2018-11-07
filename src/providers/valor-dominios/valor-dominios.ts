import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the ValorDominiosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ValorDominiosProvider {
  
  private url:string="http://localhost:3000/valor_dominios"

  constructor(public http: HttpClient) {
    console.log('Hello ValorDominiosProvider Provider');
  }

  	encabezados(token){
		let encabezados:any;
		return encabezados={headers: new HttpHeaders({
	  		'Content-Type': 'application/json',
	  		'Authorization': token
  		})};
	}

	/*Traer un valor dominio*/
	showValorDominio(id, token):Observable<any>{	  
	  	let urlValorDominio=this.url+"/"+id;
	  	console.log('showValorDominio '+urlValorDominio);
	  	return this.http.get<any>(urlValorDominio,
	  		this.encabezados(token));
	}


}
