import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPacienteComponent } from './gestionar-paciente.component';

describe('GestionarPacienteComponent', () => {
  let component: GestionarPacienteComponent;
  let fixture: ComponentFixture<GestionarPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarPacienteComponent ]
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
