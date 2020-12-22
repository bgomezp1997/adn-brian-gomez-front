import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EpsComponent } from './components/eps/eps.component';
import { GestionarEpsComponent } from './components/gestionar-eps/gestionar-eps.component';

const routes: Routes = [
  {
    path: '',
    component: EpsComponent,
    children: [
      {
        path: 'gestionar',
        component: GestionarEpsComponent
      },
      {
        path: 'gestionar/:id',
        component: GestionarEpsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpsRoutingModule { }
