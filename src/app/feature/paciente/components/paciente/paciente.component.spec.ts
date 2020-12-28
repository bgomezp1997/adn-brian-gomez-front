import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '@paciente/shared/service/paciente.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { PacienteComponent } from './paciente.component';

describe('PacienteComponent', () => {
  let component: PacienteComponent;
  let fixture: ComponentFixture<PacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
        AutocompleteLibModule
      ],
      providers: [PacienteService, HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
