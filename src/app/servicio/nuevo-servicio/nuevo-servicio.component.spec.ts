import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoServicioComponent } from './nuevo-servicio.component';

describe('NuevoServicioComponent', () => {
  let component: NuevoServicioComponent;
  let fixture: ComponentFixture<NuevoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
