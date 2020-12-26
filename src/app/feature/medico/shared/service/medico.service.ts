import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Medico } from '../model/medico';

@Injectable()
export class MedicoService {

  private notificarGestion = new EventEmitter<any>();

  constructor(protected http: HttpService) {
  }

  get notificar(): EventEmitter<any> {
    return this.notificarGestion;
  }

  public guardar(medico: Medico) {
    return this.http.doPost<Medico, boolean>(`${environment.endpoint}/medico`, medico, this.http.optsName('crear medico'));
  }

  public actualizar(medico: Medico) {
    return this.http.doPut<Medico>(`${environment.endpoint}/medico/${medico.id}`, medico, this.http.optsName('actualizar medico'));
  }

  public consultar() {
    return this.http.doGet<Medico[]>(`${environment.endpoint}/medico`, this.http.optsName('consultar medicos'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Medico>(`${environment.endpoint}/medico/${id}`, this.http.optsName('consultar medico por id'));
  }

  public eliminar(medico: Medico) {
    return this.http.doDelete(`${environment.endpoint}/medico/${medico.id}`, this.http.optsName('elimina medico'));
  }
}
