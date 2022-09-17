import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PatientService } from 'src/app/service/patient.service';
import { ServicepersonaService } from 'src/app/service/servicepersona.service';

class Fecha {
  year: number;
  month: number;
  day: number;

  constructor() {
    this.year = 0;
    this.month = 0;
    this.day = 0;
  }
}

@Component({
  selector: 'app-modificar-pacientes',
  templateUrl: './modificar-pacientes.component.html',
  styleUrls: ['./modificar-pacientes.component.css']
})
export class ModificarPacientesComponent implements OnInit {

  // objeto paciente
  public paciente: any = {};
  public pacienteid: number = -1;
  public fecha: Fecha = new Fecha();
  private persona = new Persona();

  constructor(private route: ActivatedRoute, private api: PatientService, private apipersona: ServicepersonaService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.pacienteid = parseInt(paramMap.get('id') ?? '-1');
    });
    console.log("Cargado paciente id:", this.pacienteid);
    this.createPaciente();
    // setteamos los datos del paciente
    this.apipersona.getPersona(this.pacienteid)
      .subscribe((data: Persona) => {
        this.paciente.id = data.idPersona;
        this.paciente.name = data.nombre ? data.nombre : '';
        this.paciente.lastName = data.apellido ? data.apellido : '';
        this.paciente.email = data.email ? data.email : '';
        this.paciente.phone = data.telefono ? data.telefono : '';
        this.paciente.document = data.cedula ? data.cedula : '';
        this.paciente.type = 'FISICA';
        this.paciente.birthday = data.fechaNacimiento ? data.fechaNacimiento : '';
      });

    console.log('paciente obtenido:', this.paciente);
    console.log('fecha:', this.paciente.birthday);
    var splited = this.paciente.birthday.split('-', 3);
    console.log("splited:", splited);
    this.fecha.year = parseInt(splited[0]);
    this.fecha.month = parseInt(splited[1]);
    this.fecha.day = parseInt(splited[2]);
  }

  createPaciente() {
    this.paciente = {
      id: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      document: '',
      type: 'FISICA',
      birthday: '',
    };
  }

  async editarPaciente() {
    console.log("CreEditando el paciente ", this.paciente);
    console.log("fecha", this.paciente.birthday);
    if (this.isValidPatient()) {
      await this.api.editPatient(this.paciente);
    } else {
      alert("Agregue todo los datos del Paciente!");
    }
  }

  onDateChange() {
    this.paciente.birthday = this.getDateString();
  }

  getDateString() {
    return `${this.fecha.year}-${this.fecha.month <= 9 ? '0' : ''}${this.fecha.month}-${this.fecha.day <= 9 ? '0' : ''}${this.fecha.day}`;
  }

  public isValidPatient(): boolean {
    return !!this.paciente &&
      !!this.paciente.name &&
      !!this.paciente.lastName &&
      !!this.paciente.document &&
      !!this.paciente.phone &&
      !!this.paciente.type &&
      !!this.paciente.birthday;
  }

}

