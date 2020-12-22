import { NgModule } from '@angular/core';

import { CitaComponent } from './components/cita/cita.component';
import { GestionarCitaComponent } from './components/gestionar-cita/gestionar-cita.component';
import { SharedModule } from '@shared/shared.module';
import { CitaService } from './shared/service/cita.service';
import { CitaRoutingModule } from './cita-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    CitaComponent,
    GestionarCitaComponent
  ],
  imports: [
    CitaRoutingModule,
    SharedModule,
    NgbModule,
    AutocompleteLibModule
  ],
  providers: [CitaService, DatePipe]
})
export class CitaModule { }
