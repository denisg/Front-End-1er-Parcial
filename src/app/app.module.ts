import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicepersonaService } from './service/servicepersona.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaisComponent } from './pais/pais.component';
// import { FichaComponent } from './ficha/ficha.component';
// import { NuevafichaComponent } from './ficha/nuevaficha/nuevaficha.component';
import { BuscarclienteComponent } from './buscarcliente/buscarcliente.component';
import { BuscarempleadoComponent } from './buscarempleado/buscarempleado.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ModificarReservaComponent } from './reserva/modificar-reserva/modificar-reserva.component';
import { NuevaReservaComponent } from './reserva/nueva-reserva/nueva-reserva.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, PaisComponent, HomeComponent,
    //  FichaComponent,
    //  NuevafichaComponent,
    BuscarempleadoComponent,
    BuscarclienteComponent,
    ReporteComponent,
    ReservaComponent,
    ModificarReservaComponent,
    NuevaReservaComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [ServicepersonaService],
  bootstrap: [AppComponent],
})
export class AppModule { }
