import { TestBed } from '@angular/core/testing';

import { ServicefichaService } from './serviceficha.service';

describe('ServicefichaService', () => {
  let service: ServicefichaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicefichaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
