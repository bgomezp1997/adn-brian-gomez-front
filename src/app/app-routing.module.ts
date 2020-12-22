import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { HomeComponent } from '@home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [SecurityGuard]  },
  { path: 'producto', loadChildren: () => import('@producto/producto.module').then(mod => mod.ProductoModule) },
  { path: 'cita', loadChildren: () => import('@cita/cita.module').then(mod => mod.CitaModule) },
  { path: 'eps', loadChildren: () => import('@eps/eps.module').then(mod => mod.EpsModule) },
  { path: 'medico', loadChildren: () => import('@medico/medico.module').then(mod => mod.MedicoModule) },
  { path: 'paciente', loadChildren: () => import('@paciente/paciente.module').then(mod => mod.PacienteModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
