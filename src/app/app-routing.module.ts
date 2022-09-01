import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaisComponent } from './pais/pais.component';
import { LoginComponent } from './login/login.component';
// import { FichaComponent } from './ficha/ficha.component';
// import { NuevafichaComponent } from './ficha/nuevaficha/nuevaficha.component';
// import { ModificarfichaComponent } from './ficha/modificarficha/modificarficha.component';
<<<<<<< HEAD
import { ReporteComponent } from './reporte/reporte.component';
=======
import { NuevoServicioComponent } from './servicio/nuevo-servicio/nuevo-servicio.component';
import { ServicioComponent } from './servicio/servicio.component';
import { VerServicioComponent } from './servicio/ver-servicio/ver-servicio.component';
import { AgregarDetalleComponent } from './servicio/agregar-detalle/agregar-detalle.component';
>>>>>>> b1c77030c66797dab5dd520aa6ff57d2c0277790

//se rutea los componentes aqui, que es el componente principal
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'pais',
    component: PaisComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'ficha',
  //   component: FichaComponent,
  // },

  // {
  //   path: 'ficha/nuevo',
  //   component: NuevafichaComponent,
  // },
  // {
  //   path: 'ficha/:id/editar',
  //   component: ModificarfichaComponent,
  // },
<<<<<<< HEAD
  {
    path: "reporte",
    component: ReporteComponent
=======
  
  {
    path: "servicio",
    component: ServicioComponent
  },
  {
    path: "servicio/nuevo",
    component: NuevoServicioComponent
  },
  {
    path: "servicio/:id/ver",
    component: VerServicioComponent
  },
  {
    path: "servicio/:id/detalle",
    component: AgregarDetalleComponent
>>>>>>> b1c77030c66797dab5dd520aa6ff57d2c0277790
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
