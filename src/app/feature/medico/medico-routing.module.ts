import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionarMedicoComponent } from './components/gestionar-medico/gestionar-medico.component';
import { MedicoComponent } from './components/medico/medico.component';

const routes: Routes = [
  {
    path: '',
    component: MedicoComponent,
    children: [
      {
        path: 'gestionar',
        component: GestionarMedicoComponent
      },
      {
        path: 'gestionar/:id',
        component: GestionarMedicoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
