import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../registro';
const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class RegistroService {
 // private apiUrl: string = 'http://localhost:8080/';
 private apiUrl: string = "https://tucvbackjava.herokuapp.com/usuario";
   constructor(private http: HttpClient) {}
   
   register(user: Registro): Observable<any> {   
    
    return this.http.post(this.apiUrl, user);
   
  }
 }