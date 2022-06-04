import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,  
    private http: HttpClient,
    private ruta: Router,
    private autenticacionService:AutenticacionService 
  ) {
  
    this.loginForm=this.formBuilder.group({
      email: [''],
      password: [''],
      }) 

  }

  ngOnInit(): void {
 
  }


get Email() {
  return this.loginForm.get('email');
}

get Password() {
  return this.loginForm.get('password');
}

login(event: Event) { 
  event.preventDefault;
  this.autenticacionService.iniciarSesion(this.loginForm.value).subscribe(data =>{
   // console.log("DATA: " + JSON.stringify(data));
    this.ruta.navigate(['/admin']);     
 
  })
  
 
} 
}

