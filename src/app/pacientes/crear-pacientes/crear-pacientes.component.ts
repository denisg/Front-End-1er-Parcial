import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';

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
  selector: 'app-crear-pacientes',
  templateUrl: './crear-pacientes.component.html',
  styleUrls: ['./crear-pacientes.component.css']
})
export class CrearPacientesComponent implements OnInit {

  // objeto paciente
  public paciente: any = {};
  public fecha: Fecha = new Fecha();

  constructor(private api: PatientService) { }

  ngOnInit(): void {
    this.clearSelectedPatient();
  }

  clearSelectedPatient() {
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

  async guardarPaciente() {
    console.log("Creado nuevo paciente", this.paciente);
    console.log("fecha", this.paciente.birthday);
    if (this.isValidPatient()) {
      await this.api.createPatient(this.paciente);
      this.clearSelectedPatient();
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
