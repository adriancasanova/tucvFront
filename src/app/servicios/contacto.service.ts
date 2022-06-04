import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }

  contacto(contacto: any): Observable<any> {   
    console.log(contacto)
 return this.http.post("http://localhost/prueba/contacto.php", JSON.stringify(contacto));
   //   return this.http.post("https://tucvbackphp.herokuapp.com/contacto.php", JSON.stringify(contacto));
   
  }
 

}
