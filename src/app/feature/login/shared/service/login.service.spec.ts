import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let httpMock: HttpTestingController;
  let service: LoginService;

  const apiEndpointLogin = `${environment.endpoint}/usuario/login`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    const loginService: LoginService = TestBed.inject(LoginService);
    expect(loginService).toBeTruthy();
  });

  it('deberia obtener un token', () => {
    const dummyUsuarios = new Usuario();
    dummyUsuarios.id = 1;
    service.autenticar(dummyUsuarios).subscribe(respuesta => {
      expect(respuesta).toEqual(dummyUsuarios);
    });
    const req = httpMock.expectOne(apiEndpointLogin);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });
});
