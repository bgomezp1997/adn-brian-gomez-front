import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CitaService } from '@cita/shared/service/cita.service';
import { HttpService } from '@core/services/http.service';
import { MedicoService } from '@medico/shared/service/medico.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '@paciente/shared/service/paciente.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GestionarCitaComponent } from './gestionar-cita.component';

describe('GestionarCitaComponent', () => {
  let component: GestionarCitaComponent;
  let fixture: ComponentFixture<GestionarCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarCitaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
        AutocompleteLibModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [CitaService, MedicoService, PacienteService, DatePipe, HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
