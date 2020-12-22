import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Medico } from '../model/medico';

@Injectable()
export class MedicoService {

  constructor(protected http: HttpService) { 
  }

  public consultar() {
    return this.http.doGet<Medico[]>(`${environment.endpoint}/medico`, this.http.optsName('consultar medicos'));
  }
}
