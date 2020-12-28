import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ParametroService } from '@core/services/parametro.service';
import { MedicoService } from '@medico/shared/service/medico.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { GestionarMedicoComponent } from './gestionar-medico.component';

describe('GestionarMedicoComponent', () => {
  let component: GestionarMedicoComponent;
  let fixture: ComponentFixture<GestionarMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarMedicoComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
        AutocompleteLibModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [MedicoService, ParametroService, DatePipe, HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
