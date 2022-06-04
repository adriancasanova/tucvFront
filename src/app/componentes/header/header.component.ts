import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUserSubject: any;

  constructor(private router: Router, private autenticacionService:AutenticacionService) { }

  ngOnInit(): void {
  }
  hasRoute(route: string) {
    return this.router.url === route;
  }
  Logueado(route: string) {
    return this.router.url === route;
  }
  desloguear() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.autenticacionService.currentUserSubject.next(null);
}


}
