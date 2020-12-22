import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { PacienteService } from './shared/service/paciente.service';


@NgModule({
  declarations: [
    // Component
  ],
  imports: [
    SharedModule
  ],
  providers: [
    PacienteService
  ]
})
export class PacienteModule { }
