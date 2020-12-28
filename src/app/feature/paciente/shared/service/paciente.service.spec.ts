import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Paciente } from '../model/paciente';

import { PacienteService } from './paciente.service';

describe('PacienteService', () => {
  let httpMock: HttpTestingController;
  let service: PacienteService;

  const apiEndpointPaciente = `${environment.endpoint}/paciente`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PacienteService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(PacienteService);
  });

  it('should be created', () => {
    const pacienteService: PacienteService = TestBed.inject(PacienteService);
    expect(pacienteService).toBeTruthy();
  });

  it('deberia crear un paciente', () => {
    const dummyPaciente = new Paciente();
    service.guardar(dummyPaciente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointPaciente);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia actualizar un paciente', () => {
    const dummyPaciente = new Paciente();
    dummyPaciente.id = 1;
    service.actualizar(dummyPaciente).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyPaciente);
    });
    const req = httpMock.expectOne(`${apiEndpointPaciente}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyPaciente);
  });

  it('deberia eliminar un paciente', () => {
    const dummyPaciente = new Paciente();
    dummyPaciente.id = 1;
    service.eliminar(dummyPaciente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointPaciente}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia listar pacientes', () => {
    const dummyPacientes = [
      new Paciente(), new Paciente()
    ];
    service.consultar().subscribe(pacientes => {
      expect(pacientes.length).toBe(2);
      expect(pacientes).toEqual(dummyPacientes);
    });
    const req = httpMock.expectOne(apiEndpointPaciente);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPacientes);
  });

  it('deberia obtener un paciente por id', () => {
    const dummyPacientes = new Paciente();
    dummyPacientes.id = 1;
    service.consultarPorId(dummyPacientes.id).subscribe(respuesta => {
      expect(respuesta).toEqual(dummyPacientes);
    });
    const req = httpMock.expectOne(`${apiEndpointPaciente}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPacientes);
  });

});
