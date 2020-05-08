import { TestBed } from '@angular/core/testing';

import { RestTimerService } from './rest-timer.service';

describe('RestTimerService', () => {
  let service: RestTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
