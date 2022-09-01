import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../models/persona'
import { isSessionActive } from '../models/session';
import { ServicepersonaService } from '../service/servicepersona.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  personas: Persona[] = [];
  usuario: Persona = new Persona();
  mensaje: String = "";
  constructor(private servicioPersona: ServicepersonaService, private router: Router )  { }

  ngOnInit(): void {
    
    if(isSessionActive()){
      this.router.navigate(['']);
    }
  }

  submit(): void {
    this.servicioPersona.getUsuariosDelSistema().subscribe(
      entity => {
        
        this.personas = entity.lista
        let valid = false;
        for(let p of this.personas){
          if (p.usuarioLogin == this.usuario.usuarioLogin){
            valid = true;
            break;
        }
      }
      if (valid){
        localStorage.setItem('session','active');
        localStorage.setItem('userSession',this.usuario.usuarioLogin)
        this.router.navigate(['']);
      }else{
        this.mensaje = "El nombre de usuario no está registrado en el   sistema ";
      }    
    },
      error =>console.log('no se pudieron conseguir las personas')
     );
    
  }

}
