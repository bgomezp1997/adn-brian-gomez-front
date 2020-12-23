import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { MedicoService } from './shared/service/medico.service';
import { MedicoComponent } from './components/medico/medico.component';
import { GestionarMedicoComponent } from './components/gestionar-medico/gestionar-medico.component';
import { MedicoRoutingModule } from './medico-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    MedicoComponent,
    GestionarMedicoComponent],
  imports: [
    MedicoRoutingModule,
    SharedModule,
    NgbModule,
    AutocompleteLibModule
  ],
  providers: [
    MedicoService,
    DatePipe
  ]
})
export class MedicoModule { }
