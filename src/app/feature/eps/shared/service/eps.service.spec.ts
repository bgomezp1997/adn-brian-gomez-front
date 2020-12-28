import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Eps } from '../model/eps';

import { EpsService } from './eps.service';

describe('EpsService', () => {
  let httpMock: HttpTestingController;
  let service: EpsService;

  const apiEndpointEps = `${environment.endpoint}/eps`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpsService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(EpsService);
  });

  it('should be created', () => {
    const epsService: EpsService = TestBed.inject(EpsService);
    expect(epsService).toBeTruthy();
  });

  it('deberia crear un eps', () => {
    const dummyEps = new Eps();
    service.guardar(dummyEps).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointEps);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia actualizar un eps', () => {
    const dummyEps = new Eps();
    dummyEps.id = 1;
    service.actualizar(dummyEps).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyEps);
    });
    const req = httpMock.expectOne(`${apiEndpointEps}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyEps);
  });

  it('deberia eliminar un eps', () => {
    const dummyEps = new Eps();
    dummyEps.id = 1;
    service.eliminar(dummyEps).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointEps}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia listar epss', () => {
    const dummyEpss = [
      new Eps(), new Eps()
    ];
    service.consultar().subscribe(epss => {
      expect(epss.length).toBe(2);
      expect(epss).toEqual(dummyEpss);
    });
    const req = httpMock.expectOne(apiEndpointEps);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEpss);
  });

  it('deberia obtener un eps por id', () => {
    const dummyEpss = new Eps();
    dummyEpss.id = 1;
    service.consultarPorId(dummyEpss.id).subscribe(respuesta => {
      expect(respuesta).toEqual(dummyEpss);
    });
    const req = httpMock.expectOne(`${apiEndpointEps}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEpss);
  });
});
