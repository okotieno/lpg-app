import { TestBed } from '@angular/core/testing';

import { CanisterSizesService } from './canister-sizes.service';

describe('CanisterSizesService', () => {
  let service: CanisterSizesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanisterSizesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
