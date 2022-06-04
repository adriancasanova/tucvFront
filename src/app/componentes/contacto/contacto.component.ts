import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Contacto } from 'src/app/contacto';
import { ContactoService } from 'src/app/servicios/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  nombre!: string;
  apellido!: string;
  email!: string;
  asunto!: string;
  experienciaModels: Contacto = new Contacto();
  public contactForms!: FormGroup;
  constructor(private contactoService: ContactoService, private formBuilder: FormBuilder, 
    private ruta: Router) { 

    this.contactForms=this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      asunto: [''],
        }) 
  

  }

  ngOnInit(): void {
  }

 /* contacto() {
    const user = { email: this.email, asunto: this.asunto, nombre: this.nombre, apellido: this.apellido };
    this.contactoService.contacto(user).subscribe(data => {
      console.log(data);
    });
  } */

  contacto(){
    this.experienciaModels.nombre = this.contactForms.value.nombre;
    this.experienciaModels.apellido = this.contactForms.value.apellido;
    this.experienciaModels.email = this.contactForms.value.email;
    this.experienciaModels.asunto = this.contactForms.value.asunto;
    this.contactoService.contacto(this.experienciaModels).subscribe(res =>{
      let ref = document.getElementById('cancel');
      ref?.click();
      this.contactForms.reset();     
    })
    alert("Su mensaje ha sido enviado correctamente");
    this.ruta.navigate(['/home']);   
  } 

}
