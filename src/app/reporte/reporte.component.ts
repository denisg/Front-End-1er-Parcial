import { HttpClient } from '@angular/common/http';
import { Categoria } from '../model/categoria';
import { Persona } from '../model/persona';
import { Subcategoria } from '../model/subcategoria';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { ServicetipoproductoService } from '../service/servicetipoproducto.service';
import { Component, OnInit } from '@angular/core';
import { Servicio } from '../model/servicio';
import { ServicioService } from '../service/servicio.service';
import { Detalle } from '../model/detalle'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ExportToCSV } from "@molteni/export-csv";
import { PresentacionProducto } from '../model/presentacionProducto';

type Filtro = {
  fechaDesde ?: string,
  fechaHasta?: string,
  idEmpleado?: number,
  idCliente?: number,
  idCategoria?: number,
  idTipoProducto?: number,
  idPresentacionProducto?: number,
};

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})

export class ReporteComponent implements OnInit {
  public data: Servicio[] = [];
  public superData: Detalle[]=[];
  public columns: string[]=[];
  
  // variables togleables para ocultar tablas y botones de acuerdo al formato del reporte
  esconderDetallado = true;
  esconderBasico = true;
  esconderBoton = true;

  categorias: Categoria [] = []
  tipoProductos: Subcategoria[] = []
  presentacionProductos: PresentacionProducto[] = [];
  presentacionProducto: PresentacionProducto = new PresentacionProducto();
  empleado : Persona = new Persona()
  cliente : Persona = new Persona()
  categoria: Categoria = new Categoria()
  tipoProducto: Subcategoria = new Subcategoria()
  filtros: Filtro = {};
  tipoReporte: string = "";
  constructor(private http: HttpClient, private servicioServicio: ServicioService,private serviceCategoria: ServicecategoriaService,private serviceTipoProducto: ServicetipoproductoService) { }

  ngOnInit(){
    this.servicioServicio.getPresentacionProducto().subscribe((data:any)=>{
      this.presentacionProductos = data.lista;
    });
  }

  getServicios(){
    this.servicioServicio.getServicios(this.filtros)
    .subscribe((data:any)=>{
     console.log(data);
     this.data = data.lista;
    });
  }

  getDetalles(){
    this.servicioServicio.getServiciosDetallado(this.filtros)
    .subscribe((data:any)=>{
     console.log(data);
     this.superData = data.lista;
    });
  }

  generarReporteDetallado(): void{
    this.tipoReporte = "detallado"
    //funciona, no tocar
    this.esconderDetallado = false
    this.esconderBasico = true
    this.esconderBoton = false
    this.columns = ["Servicio", "Fecha", "Profesional", "Cliente","Precio","Cantidad","Total","Presentacion"]
    this.filtros.idCliente = this.cliente.idPersona
    this.filtros.idEmpleado = this.empleado.idPersona
    this.filtros.idPresentacionProducto = this.presentacionProducto.idPresentacionProducto;
    if (this.filtros.fechaDesde && this.filtros.fechaHasta){
      this.getDetalles()  
    }
  }

  generarReporteBasico(): void{
    this.tipoReporte= "basico"
    //funciona, no tocar
    this.esconderDetallado = true
    this.esconderBasico = false
    this.esconderBoton = false
    this.columns = ["Fecha", "Profesional", "Cliente","Presupuesto","Subcategoria"]
    this.filtros.idCliente = this.cliente.idPersona
    this.filtros.idEmpleado = this.empleado.idPersona
    this.filtros.idPresentacionProducto = this.presentacionProducto.idPresentacionProducto;
    if (this.filtros.fechaDesde && this.filtros.fechaHasta){
      this.getServicios()  
    }
  }
  //DESCARGAR EXCEL
  descargarCSV():void{
    if (this.tipoReporte == "basico"){
      this.basicoCSV();
    }
    else if(this.tipoReporte == "detallado"){
      this.detalladoCSV();
    }
    else{
      console.log("llama al mismisimo Hugo Fleitas y mostrale este mensaje")
    }
  }

  basicoCSV():void{
    let datos:any[]=[];
    this.data.forEach((fila)=>{
      let row:any = {} 
      row["Fecha"]=fila.fechaHora.split(" ")[0]
      row["Profesional"]=fila.idFichaClinica.idEmpleado.nombreCompleto
      row["Cliente"]=fila.idFichaClinica.idCliente.nombreCompleto
      row["Presupuesto"]=fila.presupuesto
      row["Subcategoria"]=fila.idFichaClinica.idTipoProducto.descripcion
      datos.push(row)
    });
    let exportadorCSV = new ExportToCSV(); 
    exportadorCSV.exportColumnsToCSV(datos, "Servicios_Basicos" + new Date().toISOString().slice(0, 10) + ".xlsx" ,this.columns);
  }

  detalladoCSV():void{
    let datos:any[]=[];
    this.superData.forEach((fila)=>{
      let row:any = {} 
      row["Servicio"]=fila.idServicio.idServicio
      row["Fecha"]=fila.idServicio.fechaHora.split(" ")[0]
      row["Profesional"]=fila.idServicio.idFichaClinica.idEmpleado.nombreCompleto
      row["Cliente"]=fila.idServicio.idFichaClinica.idCliente.nombreCompleto
      row["Precio"]=fila.idPresentacionProducto.existenciaProducto.precioVenta
      row["Cantidad"]=fila.cantidad
      row["Total"]=fila.idPresentacionProducto.existenciaProducto.precioVenta*fila.cantidad
      row["Presentacion"]=fila.idPresentacionProducto.nombre
      datos.push(row)
    });
    let exportadorCSV = new ExportToCSV(); 
    exportadorCSV.exportColumnsToCSV(datos, "Servicios_Detallados" + new Date().toISOString().slice(0, 10) + ".xlsx" ,this.columns);
  }

  //DESCARGAR PDF
  descargarPDF(): void{
    if (this.tipoReporte == "basico"){
      this.basicoPDF();
    }
    else if(this.tipoReporte == "detallado"){
      this.detalladoPDF();
    }
    else{
      console.log("llama a Hugo Fleitas")
    }
  }

  basicoPDF():void{
    var doc = new jsPDF();
    let datos:any[]=[];
    console.log(this.data)
    this.data.forEach((fila)=>{
      let row:any[] = [] 
      row.push(fila.fechaHora.split(" ")[0])
      row.push(fila.idFichaClinica.idEmpleado.nombreCompleto)  
      row.push(fila.idFichaClinica.idCliente.nombreCompleto)
      row.push(fila.presupuesto)
      row.push(fila.idFichaClinica.idTipoProducto.descripcion)
      datos.push(row)
    });
    doc.setFontSize(13).setFont('helvetica', 'bold');
    doc.text('Reporte Básico de Servicios\n',doc.internal.pageSize.getWidth() / 2, 8, {align: 'center'}).setFontSize(11).setFont('Helvetica','normal');
    let contadorLineas = 1;
    let cabecera = ""
    if(this.filtros.idEmpleado){
      cabecera += "Profesional: " + this.empleado.nombreCompleto+"\n";
      contadorLineas+=1;
    }
    if(this.filtros.idCliente){
      cabecera += "Cliente: " + this.cliente.nombreCompleto+"\n";
      contadorLineas+=1;
    }
    if (this.filtros.fechaDesde){
      cabecera += "Fecha Inicio: " + this.filtros.fechaDesde +"\n";
      contadorLineas+=1;
    }
    if (this.filtros.fechaHasta){
      cabecera += "Fecha Fin: " + this.filtros.fechaHasta+"\n";
      contadorLineas+=1;
    }
    doc.text(cabecera, 11, 16); //agrega cabecera al pdf
    doc.setFontSize(11);
    doc.setTextColor(100);
    (doc as any).autoTable({
      margin: {top:contadorLineas*9},
      head: [this.columns],
      body: datos,
      theme: 'plain',
      didDrawCell: (data: { column: { index: any; }; }) => {
      }
    })
    doc.output('dataurlnewwindow');
    doc.save('myteamdetail.pdf');
  }
  
  detalladoPDF():void{
    var doc = new jsPDF();
    let datos:any[]=[];
    console.log(this.superData)
    this.superData.forEach((fila)=>{
      let row:any[] = [] 
        row.push(fila.idServicio.idServicio)
        row.push(fila.idServicio.fechaHora.split(" ")[0])
        row.push(fila.idServicio.idFichaClinica.idEmpleado.nombreCompleto)
        row.push(fila.idServicio.idFichaClinica.idCliente.nombreCompleto)
        row.push(fila.idPresentacionProducto.existenciaProducto.precioVenta)
        row.push(fila.cantidad)
        row.push(fila.idPresentacionProducto.existenciaProducto.precioVenta*fila.cantidad)
        row.push(fila.idPresentacionProducto.nombre)
        datos.push(row)
    });
    doc.setFontSize(13).setFont('helvetica', 'bold');
    doc.text('Reporte Detallado de Servicios\n',doc.internal.pageSize.getWidth() / 2, 8, {align: 'center'}).setFontSize(11).setFont('Helvetica','normal');
    let contadorLineas = 1;
    let cabecera = ""
    if(this.filtros.idEmpleado){
      cabecera += "Profesional: " + this.empleado.nombreCompleto+"\n";
      contadorLineas+=1;
    }
    if(this.filtros.idCliente){
      cabecera += "Cliente: " + this.cliente.nombreCompleto+"\n";
      contadorLineas+=1;
    }
    if (this.filtros.fechaDesde){
      cabecera += "Fecha Inicio: " + this.filtros.fechaDesde +"\n";
      contadorLineas+=1;
    }
    if (this.filtros.fechaHasta){
      cabecera += "Fecha Fin: " + this.filtros.fechaHasta+"\n";
      contadorLineas+=1;
    }
    doc.text(cabecera, 11, 16); //agrega cabecera al pdf
    doc.setFontSize(11);
    doc.setTextColor(100);
    (doc as any).autoTable({
      margin: {top:contadorLineas*9},
      head: [this.columns],
      body: datos,
      theme: 'plain',
      didDrawCell: (data: { column: { index: any; }; }) => {
      }
    })
    doc.output('dataurlnewwindow');
    doc.save('myteamdetail.pdf');
  }

  seleccionarEmpleado(empleado: Persona){
    this.empleado = empleado
    this.empleado.fullName = empleado.nombre + " " + empleado.apellido;
  }

  seleccionarCliente(cliente: Persona){
    this.cliente = cliente
    this.cliente.fullName = cliente.nombre + " " + cliente.apellido;
  }
}
