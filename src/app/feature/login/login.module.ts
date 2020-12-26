import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './shared/service/login.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    SharedModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
