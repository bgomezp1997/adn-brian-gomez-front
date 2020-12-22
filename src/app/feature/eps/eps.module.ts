import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';
import { EpsComponent } from './components/eps/eps.component';
import { GestionarEpsComponent } from './components/gestionar-eps/gestionar-eps.component';
import { EpsRoutingModule } from './eps-routing.module';
import { EpsService } from './shared/service/eps.service';


@NgModule({
  declarations: [
    EpsComponent,
    GestionarEpsComponent],
  imports: [
    EpsRoutingModule,
    SharedModule,
    NgbModule
  ],
  providers: [
    EpsService
  ]
})
export class EpsModule { }
