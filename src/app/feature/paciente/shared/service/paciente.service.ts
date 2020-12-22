import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Paciente } from '../model/paciente';

@Injectable()
export class PacienteService {

  private _notificarGestion = new EventEmitter<any>();

  constructor(protected http: HttpService) { 
  }

  get notificarGestion() : EventEmitter<any> {
    return this._notificarGestion;
  }

  public guardar(paciente: Paciente) {
    return this.http.doPost<Paciente, boolean>(`${environment.endpoint}/paciente`, paciente, this.http.optsName('crear paciente'));
  }

  public actualizar(paciente: Paciente) {
    return this.http.doPut<Paciente>(`${environment.endpoint}/paciente/${paciente.id}`, paciente, this.http.optsName('actualizar paciente'));
  }

  public consultar() {
    return this.http.doGet<Paciente[]>(`${environment.endpoint}/paciente`, this.http.optsName('consultar pacientes'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Paciente>(`${environment.endpoint}/paciente/${id}`, this.http.optsName('consultar paciente por id'));
  }

  public eliminar(paciente: Paciente) {
    return this.http.doDelete(`${environment.endpoint}/paciente/${paciente.id}`, this.http.optsName('elimina paciente'));
  }
}
