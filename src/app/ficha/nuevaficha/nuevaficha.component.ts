import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Ficha } from 'src/app/models/fichas';
import { Persona } from 'src/app/models/persona';
import { Subcategoria } from 'src/app/models/subcategoria';
import { ServicecategoriaService } from 'src/app/service/servicecategoria.service';
import { ServicefichaService } from 'src/app/service/serviceficha.service';
import { ServicetipoproductoService } from 'src/app/service/servicetipoproducto.service';
@Component({
  selector: 'app-nuevaficha',
  templateUrl: './nuevaficha.component.html',
  styleUrls: ['./nuevaficha.component.css']
})
export class NuevafichaComponent implements OnInit {
  ficha: Ficha = new Ficha();
  empleado: Persona = new Persona();
  cliente: Persona = new Persona();
  categorias: Categoria[] = []
  tipoProductos: Subcategoria[]= [];
  tipoProducto: Subcategoria = new Subcategoria();
  categoria: Categoria = new Categoria()
  constructor(private serviceCategoria: ServicecategoriaService, private serviceTipoProducto: ServicetipoproductoService, private serviceFicha: ServicefichaService) { }

  ngOnInit(): void {
    this.getCategorias()
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

  guardarFicha(){
    this.ficha.idCliente = new Persona;
    this.ficha.idEmpleado = new Persona;
    this.ficha.idTipoProducto = new Subcategoria;
    this.ficha.idTipoProducto.idTipoProducto = this.tipoProducto.idTipoProducto
    this.ficha.idCliente.idPersona = this.cliente.idPersona
    this.ficha.idEmpleado.idPersona = this.empleado.idPersona
    console.log('Crear ficha: ',this.serviceFicha.postficha(this.ficha).subscribe())
  }

}
