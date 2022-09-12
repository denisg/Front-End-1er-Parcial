import { Component, OnInit } from '@angular/core';
import { listadatos } from '../models/datos';
import { Persona } from '../models/persona';
import { Reserva } from "../models/reserva";
import { ReservaService } from '../service/reserva.service';

type Filtro = {
  fechaDesde?: string,
  fechaHasta?: string,
  idEmpleado?: number,
  idCliente?: number,
};

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  public data: Reserva[] = [];
  public columns = ["Fecha", "Hora inicio", "Hora fin", "Profesional", "Cliente", "Acciones"];
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  empleado: Persona = new Persona();
  cliente: Persona = new Persona();
  filtros: Filtro = {};
  constructor(private reservaService: ReservaService) {
    const today = new Date();
    const todayString = `${today.getFullYear()}${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}${today.getDate() <= 9 ? '0' : ''}${today.getDate()}`;
    this.filtros.fechaDesde = todayString;
    this.filtros.fechaHasta = todayString;
  }

  ngOnInit(): void {
    this.filtros = { fechaDesde: '', fechaHasta: '' };
    this.getReservas();
    this.getReservasInicial();
  }

  getReservasInicial() {
    this.filtros.fechaDesde = "20200221";
    this.filtros.fechaHasta = "40290911";
    this.getReservas();
    this.filtros.fechaDesde = "";
    this.filtros.fechaHasta = "";
  }

  getReservas() {
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;

    let inicio = currentPage - 1;
    inicio = inicio * itemsPerPage;

    this.reservaService.getReservas(this.filtros, itemsPerPage, inicio)
      .subscribe((data: listadatos<Reserva>) => {
        this.data = data.lista;
        this.config.totalItems = data.totalDatos;
      });
  }

  cancelarReserva(reserva: Reserva) {
    this.reservaService.cancelarReserva(reserva.idReserva)
      .subscribe((data: any) => console.log(`Reserva ${reserva.idReserva} cancelada!`));
    this.getReservas();
  }

  pageChanged(event: number) {
    this.config.currentPage = event;
    this.getReservas()
  }

  seleccionarEmpleado(empleado: Persona) {
    this.empleado = empleado
    this.empleado.fullName = empleado.nombre + " " + empleado.apellido;
  }

  seleccionarCliente(cliente: Persona) {
    this.cliente = cliente
    this.cliente.fullName = cliente.nombre + " " + cliente.apellido;
  }

  buscar(): void {
    this.config.currentPage = 1;
    this.filtros.idCliente = this.cliente.idPersona;
    this.filtros.idEmpleado = this.empleado.idPersona;

    this.getReservas();
  }
}
