import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isSessionActive } from './models/session';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rehabilitacion';
  usuarioSession = localStorage.getItem('userSession') as string


  constructor(public router: Router) { }

  ngOnInit(): void {
    if (!isSessionActive()) {
      this.router.navigate(['login']);
    } else {
      this.usuarioSession = localStorage.getItem('userSession') as string;
    }
  }

  logOut(): void {
    localStorage.setItem('session', 'inactive');
    localStorage.removeItem('userSession');
    this.usuarioSession = "";
    this.router.navigate(['login']);
  }

}
