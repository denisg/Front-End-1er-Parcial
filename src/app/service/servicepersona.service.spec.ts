import { TestBed } from '@angular/core/testing';

import { ServicepersonaService } from './servicepersona.service';

describe('ServicepersonaService', () => {
  let service: ServicepersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicepersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
