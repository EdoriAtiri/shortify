import { TestBed } from '@angular/core/testing';

import { ShortenAPIService } from './shorten-api.service';

describe('ShortenAPIService', () => {
  let service: ShortenAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortenAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
