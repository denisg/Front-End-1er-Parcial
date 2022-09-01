import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva, ReservaPutBody } from 'src/app/models/reserva';
import { ReservaService } from 'src/app/service/servicereserva.service';

class Fecha {
  year: number;
  month: number;
  day: number;

  constructor() {
    const today = new Date();
    this.day = today.getDate();
    this.month = today.getMonth() + 1;
    this.year = today.getFullYear();
  }
}

class Hora {
  hora!: number;
  minuto!: number;
}

@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.css']
})
export class ModificarReservaComponent implements OnInit {

  public data: Reserva[] = [];
  public columns = ["Fecha", "Hora inicio", "Hora fin", "Profesional", "Cliente", "Acciones"];
  reserva: Reserva = new Reserva();
  fecha: Fecha = new Fecha();
  horaInicio: Hora = new Hora();
  horaFin: Hora = new Hora();
  flagAsistio: boolean = true;
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  constructor(private reservaService: ReservaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.reserva.idReserva = parseInt(paramMap.get('id') ?? '');
      this.reservaService.getReserva(this.reserva.idReserva)
        .subscribe((data: Reserva) => {
          this.reserva = data;
          this.reserva.idCliente.fullName = this.reserva.idCliente.nombre + ' ' + this.reserva.idCliente.apellido;
          this.reserva.idEmpleado.fullName = this.reserva.idEmpleado.nombre + ' ' + this.reserva.idEmpleado.apellido;
          this.fecha = this.getFecha(this.reserva.fecha);
          console.log(this.reserva.flagAsistio === "S")
          this.flagAsistio = this.reserva.flagAsistio === "S";
          this.getHorarioObject();
          console.log(this.reserva);
        });
    });
  }

  getFecha(stringDate: string): Fecha {
    return {
      year: Number(stringDate.split('-')[0]),
      month: Number(stringDate.split('-')[1]),
      day: Number(stringDate.split('-')[2]),
    }
  }

  getHorarioObject() {
    this.horaInicio.hora = Number(this.reserva.horaInicio.split(' ').pop()?.substring(0, 2));
    this.horaInicio.minuto = Number(this.reserva.horaInicio.split(' ').pop()?.substring(3, 5));
    this.horaFin.hora = Number(this.reserva.horaFin.split(' ').pop()?.substring(0, 2));
    this.horaFin.minuto = Number(this.reserva.horaFin.split(' ').pop()?.substring(3, 5));
  }

  toggleFlag() {
    this.flagAsistio = !this.flagAsistio;
  }

  modificarReserva() {
    let reservaBody = new ReservaPutBody();

    reservaBody.flagAsistio = this.flagAsistio ? 'S' : this.reserva.flagAsistio;
    reservaBody.observacion = this.reserva.observacion;
    reservaBody.idReserva = this.reserva.idReserva;

    this.reservaService.modificarReserva(reservaBody).subscribe(() => console.log('Se ha modificado la reserva!'));
  }

  /*getReservas(idEmpleado: number, fecha: string) {
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage - 1;
    inicio = inicio * itemsPerPage;
    this.reservaService.getAgenda(idEmpleado, fecha)
      .subscribe((data: Reserva[]) => {
        this.data = data;
      });
  }*/

  pageChanged(event: number) {
    this.config.currentPage = event;
  }

}