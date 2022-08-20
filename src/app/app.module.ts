import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaisComponent } from './pais/pais.component';
import {ServicepaisService} from "./service/servicepais.service";

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ServicepaisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
