import { TestBed } from '@angular/core/testing';

import { CheckUrlService } from './check-url.service';

describe('CheckUrlService', () => {
  let service: CheckUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
