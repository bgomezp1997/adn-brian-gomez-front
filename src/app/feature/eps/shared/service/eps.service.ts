import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Eps } from '../model/eps';

@Injectable()
export class EpsService {

  private notificarGestion = new EventEmitter<any>();

  constructor(protected http: HttpService) {
  }

  get notificar(): EventEmitter<any> {
    return this.notificarGestion;
  }

  public guardar(eps: Eps) {
    return this.http.doPost<Eps, boolean>(`${environment.endpoint}/eps`, eps, this.http.optsName('crear eps'));
  }

  public actualizar(eps: Eps) {
    return this.http.doPut<Eps>(`${environment.endpoint}/eps/${eps.id}`, eps, this.http.optsName('actualizar eps'));
  }

  public consultar() {
    return this.http.doGet<Eps[]>(`${environment.endpoint}/eps`, this.http.optsName('consultar eps'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Eps>(`${environment.endpoint}/eps/${id}`, this.http.optsName('consultar eps por id'));
  }

  public eliminar(eps: Eps) {
    return this.http.doDelete(`${environment.endpoint}/eps/${eps.id}`, this.http.optsName('elimina eps'));
  }
}
