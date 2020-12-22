import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarEpsComponent } from './gestionar-eps.component';

describe('GestionarEpsComponent', () => {
  let component: GestionarEpsComponent;
  let fixture: ComponentFixture<GestionarEpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarEpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
