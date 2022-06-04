import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/servicios/rest.service';
import { UiService } from 'src/app/servicios/ui.service';
import { Upload } from 'src/app/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public previsualizacion!: string;
  public archivos: any = []
  public loading!: boolean
  formValue !: FormGroup;
  experienciaModel: Upload = new Upload();

  private fileTmp: any;
  showAddTask: boolean = false;
  subscription?:Subscription;

   email!: string;
   asunto!: string;
   cuerpoEmail!: string;
  
  constructor(private uiService: UiService, private restService: RestService, private formBuilder: FormBuilder, 
    private sanitizer: DomSanitizer ) { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value) }

    
 
    ngOnInit(): void {
      this.formValue = this.formBuilder.group({
        email: [''],
        asunto: [''],
        cuerpoEmail: [''],
        cv: ['']
      })
  }

capturarFile(event: any): any {  
  this.previsualizacion = event.target;
  const archivoCapturado = event.target.files[0]
  this.extraerBase64(archivoCapturado).then((imagen: any) => {
    this.previsualizacion = imagen.base;
    console.log(imagen);
  
  })
  this.archivos.push(archivoCapturado)
  // 
  // console.log(event.target.files);

}






extraerBase64 = async ($event: any) => new Promise((resolve, _reject) => {
/*  try { */
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        base: reader.result
      });
    };
    reader.onerror = error => {
      resolve({
        base: null
        
      });
    };

/*  } catch (e) {
    return null;
  } */
})


/**
 * Limpiar imagen
 */

clearImage(): any {
  this.previsualizacion = '';
  this.archivos = [];
}



/**
 * Subir archivo
 */

subirArchivo(): any {
  try {
    this.loading = true;
    const formularioDeDatos = new FormData();
    this.archivos.forEach((archivo: string | Blob) => {
      formularioDeDatos.append('files', archivo)
    })
    // formularioDeDatos.append('_id', 'MY_ID_123')
    formularioDeDatos.append('id', '0');
    formularioDeDatos.append('email', this.formValue.value.email);
    formularioDeDatos.append('asunto', this.formValue.value.asunto);
    formularioDeDatos.append('cuerpoEmail', this.formValue.value.cuerpoEmail)
   // this.restService.post(`http://localhost/prueba/upload.php`, formularioDeDatos)
   this.restService.post(`https://tucvbackphp.herokuapp.com/index.php`, formularioDeDatos)   
   .subscribe(res => {
       
       this.loading = false;
      //  console.log('Respuesta del servidor', res);
      
      }, /*() => {
        this.loading = false;
        alert('Error');
      }) */ )     
        
  } catch (e) {
    this.loading = false;
    console.log('ERROR', e);

  } 
}
cerrar() {
  alert("El mensaje se ha enviado correctamente")
  this.formValue.reset();
  this.previsualizacion = '';
  this.archivos = [];
  this.showAddTask = false;
}


}






