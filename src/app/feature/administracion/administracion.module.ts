import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AdministracionComponent } from './components/administracion.component';
import { AdministracionRoutingModule } from './administracion-routing.module';

@NgModule({
  declarations: [
    AdministracionComponent
  ],
  imports: [
    AdministracionRoutingModule,
    SharedModule
  ],
  providers: []
})
export class AdministracionModule { }
