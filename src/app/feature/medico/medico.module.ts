import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { MedicoService } from './shared/service/medico.service';


@NgModule({
  declarations: [
    // Component
  ],
  imports: [
    SharedModule
  ],
  providers: [
    MedicoService
  ]
})
export class MedicoModule { }
