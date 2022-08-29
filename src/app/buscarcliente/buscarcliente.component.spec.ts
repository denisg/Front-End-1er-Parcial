import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarclienteComponent } from './buscarcliente.component';

describe('BuscarclienteComponent', () => {
  let component: BuscarclienteComponent;
  let fixture: ComponentFixture<BuscarclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
