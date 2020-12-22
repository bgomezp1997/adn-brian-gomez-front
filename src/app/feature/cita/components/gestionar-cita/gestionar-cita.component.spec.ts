import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionarCitaComponent } from './gestionar-cita.component';

describe('GestionarCitaComponent', () => {
  let component: GestionarCitaComponent;
  let fixture: ComponentFixture<GestionarCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarCitaComponent ]
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
