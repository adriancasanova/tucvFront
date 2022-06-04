import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/registro';
import { Observable } from 'rxjs';
import { RegistroService } from 'src/app/servicios/registro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombre!: string;
  apellido!: string;
  email!: string;
  password!: string;
  experienciaModel: Registro = new Registro();
  experienciaData !: any;

  public registerForms!: FormGroup;  // Puede ser que no corresponda
  constructor(public registroService: RegistroService, private formBuilder: FormBuilder,  
    private http: HttpClient,  private ruta: Router) { 
    /* Prueba de validacion */

   this.registerForms=this.formBuilder.group({
    nombre: [''],
    apellido: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      }) 


    /* Fin de prueba */
  }

  ngOnInit(): void {
  }

 /* GET para la validacion*/
 get Email() {
  return this.registerForms.get('email');
}

get Password() {
  return this.registerForms.get('password');
}
 
/* Fin del GET para la validacion*/

  /*register() {
    const user = { email: this.email, password: this.password, nombre: this.nombre, apellido: this.apellido };
    this.registroService.register(user).subscribe(data => {
      
    });
  }
*/

register(){
  this.experienciaModel.nombre = this.registerForms.value.nombre;
  this.experienciaModel.apellido = this.registerForms.value.apellido;
  this.experienciaModel.email = this.registerForms.value.email;
  this.experienciaModel.password = this.registerForms.value.password;
  this.registroService.register(this.experienciaModel).subscribe(res =>{
   // console.log(res);     
    let ref = document.getElementById('cancel')
    ref?.click();
    this.registerForms.reset();
   alert("registro exitoso. Ya puede iniciar sesion")
   this.ruta.navigate(['/login']);    
  })
} 

}
