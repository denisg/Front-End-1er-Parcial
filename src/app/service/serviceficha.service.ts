import { Injectable } from '@angular/core';
import { listadatos } from '../models/datos';
import { Ficha } from '../models/fichas';
import { base_url } from '../base_url';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicefichaService {
  private api = base_url + 'stock-nutrinatalia/fichaClinica';
  constructor(private http: HttpClient) {

  }
  getfichas(filtros: any, itemsPerPage: number, inicio: number): Observable<listadatos<Ficha>> {
    let ejemplo: any = {}
    if (filtros.fechaDesde) {
      ejemplo['fechaDesdeCadena'] = filtros.fechaDesde.split('-').join('')
    }
    if (filtros.fechaHasta) {
      ejemplo['fechaHastaCadena'] = filtros.fechaHasta.split('-').join('')
    }
    if (filtros.idCliente) {
      ejemplo['idCliente'] = { "idPersona": filtros.idCliente }
    }
    if (filtros.idEmpleado) {
      ejemplo['idEmpleado'] = { "idPersona": filtros.idEmpleado }
    }
    if (filtros.idTipoProducto) {
      ejemplo['idTipoProducto'] = { "idTipoProducto": filtros.idTipoProducto }
    }

    let params = new HttpParams()
      .set('cantidad', itemsPerPage)
      .set('inicio', inicio)
      .set('ejemplo', JSON.stringify(ejemplo))

    return this.http.get<listadatos<Ficha>>(this.api, { params: params });

  }
  getAllfichas(): Observable<listadatos<Ficha>> {
    return this.http.get<listadatos<Ficha>>(this.api);
  }
  postficha(ficha: Ficha): Observable<Ficha> {
    console.log("headers: " + localStorage.getItem("userSession") ?? "")
    return this.http.post<Ficha>(this.api, ficha, {
      headers: { usuario: localStorage.getItem("userSession") ?? "" }
    }).pipe(
      tap(
        data => console.log("Agregado: " + data),
        error => console.log("Error: " + error)
      )
    );
  }
  getFicha(idFichaClinica: number): Observable<Ficha> {
    return this.http.get<Ficha>(this.api + '/' + idFichaClinica);
  }
  putFicha(ficha: Ficha): Observable<Ficha> {
    return this.http.put<Ficha>(this.api, { 'idFichaClinica': ficha.idFichaClinica, 'observacion': ficha.observacion });
  }


}
