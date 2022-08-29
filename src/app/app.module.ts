import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PaisComponent } from './pais/pais.component';
import {ServicepaisService} from "./service/servicepais.service";
import { HomeComponent } from './home/home.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ServicepersonaService } from './service/servicepersona.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaisComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    ServicepersonaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
