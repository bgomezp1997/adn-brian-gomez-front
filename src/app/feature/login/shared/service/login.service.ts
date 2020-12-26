import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable()
export class LoginService {

  constructor(private httpService: HttpService) { }

  autenticar(usuario: Usuario): any {
    const credenciales = btoa(`${usuario.username}:${usuario.password}`);
    const httpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + credenciales
    });
    return this.httpService.doGet<Usuario>(`${environment.endpoint}/usuario/login`, { headers: httpHeaders });
  }
}
