import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import { Reserva, ReservaPostBody } from 'src/app/model/reserva';
import { ReservaService } from 'src/app/service/servicereserva.service';

class Hora {
  hora!: number;
  minuto!: number;
}

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

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {
  public data: Reserva[] = [];
  public columns = ["Fecha","Hora inicio","Hora fin","Profesional","Cliente","Acciones"];
  reserva: Reserva = new Reserva();
  empleado: Persona = new Persona();
  cliente: Persona = new Persona();
  horaInicio: Hora = new Hora();
  horaFin: Hora = new Hora();
  fecha: Fecha = new Fecha();
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
  }

  onChangeHoraInicio() {
    console.log(this.empleado);
  }

  getDateString() {
    return `${this.fecha.year}${this.fecha.month <= 9 ? '0' : ''}${this.fecha.month}${this.fecha.day <= 9 ? '0' : ''}${this.fecha.day}`;
  }

  onDateChange() {
    this.getReservas(this.empleado.idPersona, this.getDateString());
  }

  crearReserva() {
    //this.reservaService.postReserva(this.reserva);
    /*this.reserva.idCliente = this.cliente;
    this.reserva.idEmpleado = this.empleado;
    this.reserva.fecha = this.getDateString();
    console.log(this.horaInicio);
    console.log(this.horaFin);
    console.log(this.fecha);*/

    let reservaBody = new ReservaPostBody();

    reservaBody.fechaCadena = this.getDateString();
    reservaBody.horaInicioCadena = `${this.horaInicio.hora <= 9 ? '0' : ''}${this.horaInicio.hora}${this.horaInicio.minuto <= 9 ? '0' : ''}${this.horaInicio.minuto}`;
    reservaBody.horaFinCadena = `${this.horaFin.hora}${this.horaFin.minuto}`;
    reservaBody.idCliente = {
      idPersona: this.cliente.idPersona,
    };
    reservaBody.idEmpleado = {
      idPersona: this.empleado.idPersona,
    };

    this.reservaService.postReserva(reservaBody).subscribe((data: Reserva) => console.log(JSON.stringify(data)));
  }

  seleccionarTurno(horaInicio: string, horaFin: string) {
    this.horaInicio.hora = Number(horaInicio.split(' ').pop()?.substring(0, 2));
    this.horaInicio.minuto = Number(horaInicio.split(' ').pop()?.substring(3, 5));
    this.horaFin.hora = Number(horaFin.split(' ').pop()?.substring(0, 2));
    this.horaFin.minuto = Number(horaFin.split(' ').pop()?.substring(3, 5));
  }

  getReservas(idEmpleado: number, fecha: string) {
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;

    let inicio = currentPage - 1;
    inicio = inicio * itemsPerPage; 

    this.reservaService.getAgenda(idEmpleado, fecha, itemsPerPage, inicio)
    .subscribe((data: Reserva[]) => {
     this.data = data;
    });
  }

  seleccionarEmpleado(empleado: Persona){
    this.empleado = empleado
    this.empleado.fullName = empleado.nombre + " " + empleado.apellido;
    this.getReservas(empleado.idPersona, this.getDateString());
    console.log(`Se ha seleccionado el empleado con id = ${empleado.idPersona}`);
  }

  seleccionarCliente(cliente: Persona){
    this.cliente = cliente
    this.cliente.fullName = cliente.nombre + " " + cliente.apellido;
  }

  pageChanged(event: number){
    this.config.currentPage = event;
  }

}