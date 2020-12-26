import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable()
export class LoginService {

  constructor(private httpService: HttpService) { }

  autenticar(usuario: Usuario): any {
    var credenciales = btoa(`${usuario.username}:${usuario.password}`);
    var httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlecoded',
      'Authorization':'Basic ' + credenciales
    });
    return this.httpService.doGet<Usuario>(`${environment.endpoint}/usuario/login`, {headers: httpHeaders});
  }
}
