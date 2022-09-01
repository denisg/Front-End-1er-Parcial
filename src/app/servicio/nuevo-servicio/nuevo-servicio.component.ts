import { Component, OnInit } from '@angular/core';
import { listadatos } from 'src/app/models/datos';
import { Ficha } from 'src/app/models/fichas';
import { Persona } from 'src/app/models/persona';
import { Servicio, ServicioPostBody } from 'src/app/models/servicio';
import { ServicefichaService } from 'src/app/service/serviceficha.service';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit { 
  servicio: Servicio = new Servicio();
  ficha: Ficha = new Ficha();
  fichas: Ficha[] = [];
  cliente: Persona = new Persona();
  constructor(private servicioService: ServicioService, private serviceFicha: ServicefichaService) { }

  ngOnInit(): void {
    this.getAllFichas();
  }

  crearServicio() {

    let servicioBody = new ServicioPostBody();

    servicioBody.observacion = this.servicio.observacion;
    servicioBody.idFichaClinica = {
      idFichaClinica: this.ficha.idFichaClinica,
    };

    this.servicioService.postServicio(servicioBody).subscribe((data: Servicio) => console.log(JSON.stringify(data)));
  }

  seleccionarCliente(cliente: Persona){
    this.getAllFichas();
    this.cliente = cliente
    this.cliente.fullName = cliente.nombre + " " + cliente.apellido;
    this.serviceFicha.getAllfichas().subscribe((data:listadatos<Ficha>)=>{
      this.fichas = data.lista.filter(ficha => ficha.idCliente.idPersona === cliente.idPersona);
    })
  }

  getAllFichas(){
    this.serviceFicha.getAllfichas().subscribe((data:any)=>{
      this.fichas = data.lista;
    })
  }

}
