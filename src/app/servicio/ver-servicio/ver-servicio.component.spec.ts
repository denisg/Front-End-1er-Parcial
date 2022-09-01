import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerServicioComponent } from './ver-servicio.component';

describe('VerServicioComponent', () => {
  let component: VerServicioComponent;
  let fixture: ComponentFixture<VerServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
