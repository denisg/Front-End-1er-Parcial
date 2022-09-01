import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { Servicio } from '../models/servicio';
import { ServicioService } from '../service/servicio.service';

type Filtro = {
  fechaDesde ?: string,
  fechaHasta?: string,
  idEmpleado?: number,
  idCliente?: number,
};

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})

export class ServicioComponent implements OnInit {
  public data: Servicio[] = [];
  empleado : Persona = new Persona();
  cliente : Persona = new Persona();
  filtros: Filtro = {};
  public columns = ["Fecha","Ficha", "Fecha Ficha", "Profesional","Cliente","Categoria","Subcategoria","Acciones"];
  config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  
  constructor(private servicioService: ServicioService) { }

  ngOnInit(){
    this.getServicio();
  }
  getServicio(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage; 
    this.servicioService.getServicio(this.filtros,itemsPerPage,inicio)
    .subscribe((data:any)=>{
     this.data = data.lista;
     this.config.totalItems=  data.totalDatos;
    });
  }

  seleccionarEmpleado(empleado: Persona){
    this.empleado = empleado
    this.empleado.fullName = empleado.nombre + " " + empleado.apellido;
  }

  seleccionarCliente(cliente: Persona){
    this.cliente = cliente
    this.cliente.fullName = cliente.nombre + " " + cliente.apellido;
  }

  pageChanged(event: number){
    this.config.currentPage = event;
    this.getServicio()
  }
  buscar(): void{
    this.config.currentPage = 1
    this.filtros.idCliente = this.cliente.idPersona
    this.filtros.idEmpleado = this.empleado.idPersona

    this.getServicio()  
  }
}
