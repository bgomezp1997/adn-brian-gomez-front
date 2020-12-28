import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Medico } from '../model/medico';

import { MedicoService } from './medico.service';

describe('MedicoService', () => {
  let httpMock: HttpTestingController;
  let service: MedicoService;

  const apiEndpointMedico = `${environment.endpoint}/medico`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedicoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(MedicoService);
  });

  it('should be created', () => {
    const medicoService: MedicoService = TestBed.inject(MedicoService);
    expect(medicoService).toBeTruthy();
  });

  it('deberia crear un medico', () => {
    const dummyMedico = new Medico();
    service.guardar(dummyMedico).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointMedico);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia actualizar un medico', () => {
    const dummyMedico = new Medico();
    dummyMedico.id = 1;
    service.actualizar(dummyMedico).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyMedico);
    });
    const req = httpMock.expectOne(`${apiEndpointMedico}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyMedico);
  });

  it('deberia eliminar un medico', () => {
    const dummyMedico = new Medico();
    dummyMedico.id = 1;
    service.eliminar(dummyMedico).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointMedico}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia listar medicos', () => {
    const dummyMedicos = [
      new Medico(), new Medico()
    ];
    service.consultar().subscribe(medicos => {
      expect(medicos.length).toBe(2);
      expect(medicos).toEqual(dummyMedicos);
    });
    const req = httpMock.expectOne(apiEndpointMedico);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMedicos);
  });

  it('deberia obtener un medico por id', () => {
    const dummyMedicos = new Medico();
    dummyMedicos.id = 1;
    service.consultarPorId(dummyMedicos.id).subscribe(respuesta => {
      expect(respuesta).toEqual(dummyMedicos);
    });
    const req = httpMock.expectOne(`${apiEndpointMedico}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMedicos);
  });
});
