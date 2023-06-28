import { TestBed } from '@angular/core/testing';

import { WebTestService } from './web-test.service';

describe('WebTestService', () => {
  let service: WebTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
