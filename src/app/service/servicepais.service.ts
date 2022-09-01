import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {listadatos} from "../models/datos";
import {Pais} from "../models/pais";

@Injectable({
  providedIn: 'root'
})
export class ServicepaisService {
  private api: string = "https://equipoyosh.com/stock-nutrinatalia/pais";

  constructor(private http: HttpClient) {
  }

  getPaises(): Observable<listadatos<Pais>> {
    return this.http.get<listadatos<Pais>>(this.api);
  }
}
