import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public selectedPatient: any = {};
  public patients: Array<any> = [];

  constructor(private _service: PatientService) {
    this.clearSelectedPatient();
  }

  clearSelectedPatient() {
    this.selectedPatient = {
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

  async loadPatients() {
    this.patients = await this._service.getAllPatients("?inicio=0&orderBy=idPersona&orderDir=desc");
  }

  ngOnInit(): void {
    this.loadPatients();
  }

}
