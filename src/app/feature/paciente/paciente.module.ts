import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { PacienteService } from './shared/service/paciente.service';
import { GestionarPacienteComponent } from './components/gestionar-paciente/gestionar-paciente.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { PacienteRoutingModule } from './paciente-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    GestionarPacienteComponent,
    PacienteComponent],
  imports: [
    PacienteRoutingModule,
    SharedModule,
    NgbModule,
    AutocompleteLibModule
  ],
  providers: [
    DatePipe,
    PacienteService
  ]
})
export class PacienteModule { }
