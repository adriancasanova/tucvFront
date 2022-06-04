import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Upload } from '../upload';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor( private http: HttpClient ) {  }
  //apiUrl: string = 'http://localhost/prueba'
 /* apiUrl: string = 'https://tucvbackphp.herokuapp.com/';
  sendPost(cv: FormData):Observable<any> {
   
    return this.http.post('http://localhost/prueba', cv)
  }

  
  postUpload(upload: Upload) {
    console.log(upload.cv)
    return this.http.post(`${this.apiUrl}/index.php`, JSON.stringify(upload));    
  } */

  public post(url:string, body: FormData){
    return this.http.post(url,body); // POST  
  }



}
