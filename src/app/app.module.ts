import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CO';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '@home/home.component';
import { ProductoModule } from '@producto/producto.module';
import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { CitaModule } from '@cita/cita.module';
import { EpsModule } from '@eps/eps.module';
import { MedicoModule } from '@medico/medico.module';
import { PacienteModule } from '@paciente/paciente.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministracionModule } from '@administracion/administracion.module';
import { LoginModule } from '@login/login.module';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    ProductoModule,
    CitaModule,
    EpsModule,
    MedicoModule,
    PacienteModule,
    AdministracionModule,
    LoginModule,
    CoreModule
  ],
  providers: [
    CookieService,
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
