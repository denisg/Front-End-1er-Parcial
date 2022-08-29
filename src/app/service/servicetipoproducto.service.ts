import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { base_url } from '../base_url';
import { Subcategoria } from '../model/subcategoria';
import { listadatos } from '../model/datos';
@Injectable({
  providedIn: 'root'
})
export class ServicetipoproductoService {
  private api = base_url + "stock-nutrinatalia/tipoProducto";
  constructor(private http: HttpClient) { }

  getTipoProductos(idCategoria: number){
    let params = new HttpParams()
    .set('ejemplo', `{"idCategoria":{"idCategoria": ${idCategoria}}}`)
    return this.http.get<listadatos<Subcategoria>>(this.api,{params:params});
  }
}
