import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarMedicoComponent } from './gestionar-medico.component';

describe('GestionarMedicoComponent', () => {
  let component: GestionarMedicoComponent;
  let fixture: ComponentFixture<GestionarMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarMedicoComponent ]
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
