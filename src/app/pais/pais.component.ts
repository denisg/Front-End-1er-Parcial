import {Component, OnInit} from '@angular/core';
import {Pais} from "../model/pais";
import {ServicepaisService} from "../service/servicepais.service";

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})

//clase
export class PaisComponent implements OnInit {
  get paises(): Pais[] {
    return this._paises;
  }

  set paises(value: Pais[]) {
    this._paises = value;
  }

  private _paises: Pais[] = [];

  constructor(private servicioPais: ServicepaisService) {
  }

  ngOnInit(): void {
    this.servicioPais.getPaises().subscribe(
      entity => this._paises = entity.lista,
      error => console.log('no se pudieron conseguir los paises')
    );
  }

}
