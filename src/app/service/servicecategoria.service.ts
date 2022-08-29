import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { base_url } from '../base_url';
import { listadatos } from '../model/datos';
import { Categoria } from '../model/categoria';
@Injectable({
  providedIn: 'root'
})
export class ServicecategoriaService {
  private api: string = base_url  + "stock-nutrinatalia/categoria";
  constructor(private http: HttpClient) { 
    
  }
  getCategorias():Observable<listadatos<Categoria>>{
    return this.http.get<listadatos<Categoria>>(this.api);
  } 
}
