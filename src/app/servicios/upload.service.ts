import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
/*
  sendPost(cv: any): Observable<any> {       
    return this.http.post("localhost/TucvBackPHP", cv);    
  }
}
*/
}