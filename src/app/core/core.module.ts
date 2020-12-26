import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityGuard } from './guard/security.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { HttpService } from './services/http.service';
import { ManejadorError } from './interceptor/manejador-error';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ParametroService } from './services/parametro.service';
import { TokenStorageService } from './services/token-storage.service';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent],
  providers: [
    HttpService,
    ParametroService,
    TokenStorageService,
    SecurityGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ManejadorError }
  ]
})
export class CoreModule { }
