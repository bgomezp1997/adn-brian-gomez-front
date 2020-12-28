import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Cita } from '../model/cita';

import { CitaService } from './cita.service';

describe('CitaService', () => {
  let httpMock: HttpTestingController;
  let service: CitaService;

  const apiEndpointCita = `${environment.endpoint}/cita`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(CitaService);
  });

  it('should be created', () => {
    const epsService: CitaService = TestBed.inject(CitaService);
    expect(epsService).toBeTruthy();
  });

  it('deberia crear un cita', () => {
    const dummyCita = new Cita();
    service.guardar(dummyCita).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointCita);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia actualizar un cita', () => {
    const dummyCita = new Cita();
    dummyCita.id = 1;
    service.actualizar(dummyCita).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyCita);
    });
    const req = httpMock.expectOne(`${apiEndpointCita}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyCita);
  });

  it('deberia eliminar un cita', () => {
    const dummyCita = new Cita();
    dummyCita.id = 1;
    service.eliminar(dummyCita).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointCita}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia listar citas', () => {
    const dummyCitas = [
      new Cita(), new Cita()
    ];
    service.consultar().subscribe(citas => {
      expect(citas.length).toBe(2);
      expect(citas).toEqual(dummyCitas);
    });
    const req = httpMock.expectOne(apiEndpointCita);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCitas);
  });

  it('deberia obtener un cita por id', () => {
    const dummyCitas = new Cita();
    dummyCitas.id = 1;
    service.consultarPorId(dummyCitas.id).subscribe(respuesta => {
      expect(respuesta).toEqual(dummyCitas);
    });
    const req = httpMock.expectOne(`${apiEndpointCita}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCitas);
  });
});
