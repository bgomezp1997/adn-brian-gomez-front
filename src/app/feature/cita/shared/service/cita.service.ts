import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Cita } from '../model/cita';
import { Precio } from '../model/precio';

@Injectable()
export class CitaService {

  private notificarGestion = new EventEmitter<any>();

  constructor(protected http: HttpService) {
  }

  public get notificar(): EventEmitter<any> {
    return this.notificarGestion;
  }

  public guardar(cita: Cita) {
    return this.http.doPost<Cita, boolean>(`${environment.endpoint}/cita`, cita, this.http.optsName('crear cita'));
  }

  public actualizar(cita: Cita) {
    return this.http.doPut<Cita>(`${environment.endpoint}/cita/${cita.id}`, cita, this.http.optsName('actualizar cita'));
  }

  public consultar() {
    return this.http.doGet<Cita[]>(`${environment.endpoint}/cita`, this.http.optsName('consultar citas'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Cita>(`${environment.endpoint}/cita/${id}`, this.http.optsName('consultar cita por id'));
  }

  public eliminar(cita: Cita) {
    return this.http.doDelete(`${environment.endpoint}/cita/${cita.id}`, this.http.optsName('elimina cita'));
  }

  public obtenerPrecio(precio: Precio) {
    return this.http.doPost<Precio, any>(`${environment.endpoint}/cita/precio`, precio, this.http.optsName('obtener precio de cita'));
  }
}
