import { TestBed } from '@angular/core/testing';

import { PotatoSalesService } from './potato-sales.service';

describe('PotatoSalesService', () => {
  let service: PotatoSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotatoSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
