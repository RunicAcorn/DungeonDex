import { TestBed } from '@angular/core/testing';

import { NameFetcherService } from './namefetcher.service';

describe('NameFetcherService', () => {
  let service: NameFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
