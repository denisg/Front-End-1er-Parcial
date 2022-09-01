import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarfichaComponent } from './modificarficha.component';

describe('ModificarfichaComponent', () => {
  let component: ModificarfichaComponent;
  let fixture: ComponentFixture<ModificarfichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarfichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarfichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
