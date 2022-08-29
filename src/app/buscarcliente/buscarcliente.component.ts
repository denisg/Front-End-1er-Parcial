import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Persona } from '../model/persona';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { ServicepersonaService } from '../service/servicepersona.service';

@Component({
  selector: 'app-buscarcliente',
  templateUrl: './buscarcliente.component.html',
  styleUrls: ['./buscarcliente.component.css']
})
export class BuscarclienteComponent implements OnInit {

  @Output() seleccionarClienteEvent = new EventEmitter<Persona>()
  public data: Persona[] = [];
  
  nombre: string = "";
  apellido: string = "";
  filtros = {
    nombre : "",
    apellido: ""
  }
  public columns = ["Nombres","Apellidos","Email","Telefono","Ruc","Cedula","Fecha de Nacimiento","Acciones"];
  config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 1,
      id: 'paginationCliente'
  }
  
  next = "Siguiente"
  back = "Atras"
  constructor(private servicePersona: ServicepersonaService) { }

  ngOnInit(): void {
  }
    
  getClientes(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage; 
    this.servicePersona.getClientes(this.filtros,itemsPerPage,inicio)
    .subscribe((data:any)=>{
     console.log(data);
     this.config.totalItems=data.totalDatos;
     this.data = data.lista;
    });
  }

  buscar(){
    this.filtros.nombre = this.nombre
    this.filtros.apellido = this.apellido
    this.config.currentPage = 1
    this.getClientes()
  }
  pageChanged(event: number) : void{
    setTimeout(() => {
      this.config.currentPage = event;
      
  }, 3);
  this.getClientes()
   
  }

  seleccionarCliente(cliente: Persona){
    this.seleccionarClienteEvent.emit(cliente)
  }

 

}

