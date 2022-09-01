import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/model/persona';
import { PresentacionProducto } from 'src/app/model/presentacionProducto';
import { DetallePostBody, Servicio } from 'src/app/model/servicio';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-agregar-detalle',
  templateUrl: './agregar-detalle.component.html',
  styleUrls: ['./agregar-detalle.component.css']
})
export class AgregarDetalleComponent implements OnInit {

  servicio: Servicio = new Servicio();
  empleado: Persona = new Persona();
  cliente: Persona = new Persona();
  cantidad: number = 0;
  public presentacionProductos: PresentacionProducto[] = [];
  public presentacionProducto: PresentacionProducto = new PresentacionProducto();

  constructor(private route: ActivatedRoute, private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.servicio.idServicio = parseInt(paramMap.get('id') ?? '');
      this.servicioService.getUnServicio(this.servicio.idServicio)
      .subscribe((data:any)=>{
        this.servicio = data;
        this.empleado = data.idEmpleado;
        this.cliente = data.idFichaClinica.idCliente;
        console.log(data)
        /*this.ficha.idCliente.fullName =this.ficha.idCliente.nombre + ' ' + this.ficha.idCliente.apellido;
        this.ficha.idEmpleado.fullName =this.ficha.idEmpleado.nombre + ' ' +   this.ficha.idEmpleado.apellido;*/

      });
      /*this.servicioServicio.getServicioFicha(this.ficha.idFichaClinica).subscribe((data:any)=>{
        this.servicios = data.lista;
      });*/
    });
  }

  agregarDetalle() {

    let detalleBody = new DetallePostBody();

    detalleBody.cantidad = this.cantidad;
    detalleBody.idPresentacionProducto = {
      idPresentacionProducto: this.presentacionProducto.idPresentacionProducto
    };
    detalleBody.idServicio = {
      idServicio: this.servicio.idServicio
    };

    this.servicioService.postDetalle(detalleBody, this.servicio.idServicio).subscribe((data: Servicio) => console.log(JSON.stringify(data)));
  }

  getPresentacionProducto(){
    this.servicioService.getPresentacionProducto().subscribe((data:any)=>{
      this.presentacionProducto = data.lista;
    })
  }

}
