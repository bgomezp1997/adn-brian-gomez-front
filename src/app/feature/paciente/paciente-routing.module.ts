import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionarPacienteComponent } from './components/gestionar-paciente/gestionar-paciente.component';
import { PacienteComponent } from './components/paciente/paciente.component';

const routes: Routes = [
  {
    path: '',
    component: PacienteComponent,
    children: [
      {
        path: 'gestionar',
        component: GestionarPacienteComponent
      },
      {
        path: 'gestionar/:id',
        component: GestionarPacienteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
