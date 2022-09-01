import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isSessionActive } from './models/session';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rehabilitacion';
  constructor(public router: Router){
    
  }
  ngOnInit():void{
   
    if (! isSessionActive()){
      this.router.navigate(['login']);
    }

  }
  logOut():void{
    localStorage.setItem('session','inactive');
    this.router.navigate(['login']);    
  }
}
