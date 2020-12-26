import { Injectable } from '@angular/core';
import { Parametro } from '@core/model/parametro';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class ParametroService {

  constructor(private httpService: HttpService) { }

  public consultar(estado: boolean, tipo: string) {
    return this.httpService.doGet<Parametro[]>(`${environment.endpoint}/parametro?estado=${estado}&tipo=${tipo}`,
      this.httpService.optsName('consultar parametros por estado y tipo'));
  }
}
