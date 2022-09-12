import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Ficha } from '../models/fichas';
import { Persona } from '../models/persona';
import { Subcategoria } from '../models/subcategoria';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { ServicefichaService } from '../service/serviceficha.service';
import { ServicetipoproductoService } from '../service/servicetipoproducto.service';



type Filtro = {
  fechaDesde ?: string,
  fechaHasta?: string,
  idEmpleado?: number,
  idCliente?: number,
  idCategoria?: number,
  idTipoProducto?: number,
};
@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {
 
  public data: Ficha[] = [];
  public columns = ["Fecha","Profesional","Cliente","Categoria","Subcategoria","Acciones"];
  config = {
      id: "paginationFicha",
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 1
  }
  
  next = "Siguiente"
  back = "Atras"
  categorias: Categoria [] = []
  tipoProductos: Subcategoria[] = []

  empleado : Persona = new Persona()
  cliente : Persona = new Persona()
  categoria: Categoria = new Categoria()
  tipoProducto: Subcategoria = new Subcategoria()
  filtros: Filtro = {};
  constructor(private http: HttpClient, private servicioFicha: ServicefichaService,private serviceCategoria: ServicecategoriaService,private serviceTipoProducto: ServicetipoproductoService) { }

  ngOnInit(){
    this.getCategorias();
    this.buscar();
  }
  getFichas(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage; 
    this.servicioFicha.getfichas(this.filtros,itemsPerPage,inicio)
    .subscribe((data:any)=>{
     this.data = data.lista;
     this.config.totalItems=data.totalDatos;
    });
  }

  pageChanged(event: number){
    this.config.currentPage = event;
    this.getFichas()
  }

  buscar(): void{
    this.config.currentPage = 1
    this.filtros.idTipoProducto = this.tipoProducto.idTipoProducto
    this.filtros.idCliente = this.cliente.idPersona
    this.filtros.idEmpleado = this.empleado.idPersona

    this.getFichas()  
  }
  seleccionarEmpleado(empleado: Persona){
    this.empleado = empleado
    this.empleado.fullName = empleado.nombre + " " + empleado.apellido;
  }

  seleccionarCliente(cliente: Persona){
    this.cliente = cliente
    this.cliente.fullName = cliente.nombre + " " + cliente.apellido;
  }
  getCategorias(){
    this.serviceCategoria.getCategorias().subscribe((data:any)=>{
      this.categorias = data.lista;
    })
  }

  getTipoProductos(){
    this.serviceTipoProducto.getTipoProductos(this.categoria.idCategoria).subscribe((data:any)=>{
      this.tipoProductos = data.lista
    })
  }
}
  