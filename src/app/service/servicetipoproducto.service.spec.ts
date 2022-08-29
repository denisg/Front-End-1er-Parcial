import { TestBed } from '@angular/core/testing';

import { ServicetipoproductoService } from './servicetipoproducto.service';

describe('ServicetipoproductoService', () => {
  let service: ServicetipoproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicetipoproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
