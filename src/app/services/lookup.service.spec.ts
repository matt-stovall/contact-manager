import { TestBed } from '@angular/core/testing';

import { LookupService } from './lookup.service';

describe('LookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LookupService = TestBed.get(LookupService);
    expect(service).toBeTruthy();
  });

  it('getStateList should return a list of 50 states', () => {
    const service: LookupService = TestBed.get(LookupService);
    const vals = service.getStateList();
    expect(vals.length).toBe(50);
  });
});
