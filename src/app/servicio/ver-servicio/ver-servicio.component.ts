import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { listadatos } from 'src/app/model/datos';
import { Servicio, DetalleS as Detalle } from 'src/app/model/servicio';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-ver-servicio',
  templateUrl: './ver-servicio.component.html',
  styleUrls: ['./ver-servicio.component.css']
})
export class VerServicioComponent implements OnInit {
  servicio: Servicio = new Servicio();
  detalle: Detalle = new Detalle();
  data: Detalle[] = [];
  public columns = ["idPresentacionProducto","idServicio", "IdServicioDetalle"];
  constructor(private route: ActivatedRoute, private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.servicio.idServicio = parseInt(paramMap.get('id') ?? '');
      this.servicioService.getUnServicio(this.servicio.idServicio)
      .subscribe((data:any)=>{
        this.servicio = data;
        this.getDetalles();
        /*this.ficha.idCliente.fullName =this.ficha.idCliente.nombre + ' ' + this.ficha.idCliente.apellido;
        this.ficha.idEmpleado.fullName =this.ficha.idEmpleado.nombre + ' ' +   this.ficha.idEmpleado.apellido;*/

      });
      /*this.servicioServicio.getServicioFicha(this.ficha.idFichaClinica).subscribe((data:any)=>{
        this.servicios = data.lista;
      });*/
    });
  }

  getDetalles() { 

    this.servicioService.getDetalles(this.servicio.idServicio)
    .subscribe((data:any) => {
     this.data = data;
     console.log(this.data)
    });
  }

  deleteDetalle(detalle: Detalle) {
    this.servicioService.cancelarDetalle(this.servicio.idServicio, detalle.idServicioDetalle)
    .subscribe((data:any) => console.log(`Detalle ${detalle.idServicioDetalle} eliminado!`));
    this.getDetalles();
  }

}
