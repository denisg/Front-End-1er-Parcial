import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarempleadoComponent } from './buscarempleado.component';

describe('BuscarempleadoComponent', () => {
  let component: BuscarempleadoComponent;
  let fixture: ComponentFixture<BuscarempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarempleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
