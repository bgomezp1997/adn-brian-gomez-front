import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { EpsService } from '@eps/shared/service/eps.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '@paciente/shared/service/paciente.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { GestionarPacienteComponent } from './gestionar-paciente.component';

describe('GestionarPacienteComponent', () => {
  let component: GestionarPacienteComponent;
  let fixture: ComponentFixture<GestionarPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarPacienteComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
        AutocompleteLibModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [PacienteService, EpsService, HttpService, DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
