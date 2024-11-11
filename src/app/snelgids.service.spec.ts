import { TestBed } from '@angular/core/testing';

import { SnelgidsService } from './snelgids.service';

describe('SnelgidsService', () => {
  let service: SnelgidsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnelgidsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
