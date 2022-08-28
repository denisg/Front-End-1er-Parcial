import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {PaisComponent} from "./pais/pais.component";//se importa el componente
import { HomeComponent } from './home/home.component';

//se rutea los componentes aqui, que es el componente principal
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: 'pais',
    component: PaisComponent
  },{
    path: "login",
    component: LoginComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
