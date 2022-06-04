import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../login';
/*const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  }),
}; */

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
//url="https://tucvbackjava.herokuapp.com/login";
url="http://localhost:8080/login/"
currentUserSubject: BehaviorSubject<any>;
public currentUser!: Observable<Login>;



  constructor(private http: HttpClient) { 
//console.log("El servicio de autenticacion esta corriendo" );
this.currentUserSubject = new BehaviorSubject<any>(sessionStorage.getItem('currentUser')|| '{}');
this.currentUser = this.currentUserSubject.asObservable();
}
  iniciarSesion(credenciales:any):Observable<any> {  
  return this.http.post(this.url, credenciales, { responseType: 'text' }).pipe(map(data =>{
    sessionStorage.setItem('currentUser', JSON.stringify(data));   
    this.currentUserSubject.next(data);      
    return data;   
  })) 
}

get UsuarioAutenticado() {      
 
  return this.currentUserSubject.value;   
} 

}