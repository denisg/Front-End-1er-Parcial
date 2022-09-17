import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicepersonaService } from './service/servicepersona.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FichaComponent } from './ficha/ficha.component';
import { NuevafichaComponent } from './ficha/nuevaficha/nuevaficha.component';
import { BuscarempleadoComponent } from './buscarempleado/buscarempleado.component';
import { BuscarclienteComponent } from './buscarcliente/buscarcliente.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ServicioComponent } from './servicio/servicio.component';
import { NuevoServicioComponent } from './servicio/nuevo-servicio/nuevo-servicio.component';
import { ModificarfichaComponent } from './ficha/modificarficha/modificarficha.component';
import { ReporteComponent } from './reporte/reporte.component';
import { NuevaReservaComponent } from './reserva/nueva-reserva/nueva-reserva.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgregarDetalleComponent } from './servicio/agregar-detalle/agregar-detalle.component';
import { ModificarReservaComponent } from './reserva/modificar-reserva/modificar-reserva.component';
import { VerServicioComponent } from './servicio/ver-servicio/ver-servicio.component';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './service/category.service';
import { FullPageModalComponent } from './includes/full-page-modal/full-page-modal.component';
import { BackModalComponent } from './includes/back-modal/back-modal.component';
import { TitledInputComponent } from './includes/titled-input/titled-input.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { CreateSubcategoryComponent } from './category/create-subcategory/create-subcategory.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { CrearPacientesComponent } from './pacientes/crear-pacientes/crear-pacientes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FichaComponent,
    NuevafichaComponent,
    BuscarempleadoComponent,
    BuscarclienteComponent,
    ReservaComponent,
    ServicioComponent,
    NuevoServicioComponent,
    NuevaReservaComponent,
    ModificarReservaComponent,
    ModificarfichaComponent,
    AgregarDetalleComponent,
    VerServicioComponent,
    ReporteComponent,
    CategoryComponent,
    FullPageModalComponent,
    BackModalComponent,
    TitledInputComponent,
    SubCategoryComponent,
    CreateCategoryComponent,
    CreateSubcategoryComponent,
    PacientesComponent,
    CrearPacientesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [ServicepersonaService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule { }
