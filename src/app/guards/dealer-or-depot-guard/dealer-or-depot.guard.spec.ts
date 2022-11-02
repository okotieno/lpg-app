import { TestBed } from '@angular/core/testing';

import { DealerOrDepotGuard } from './dealer-or-depot.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: DealerOrDepotGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(DealerOrDepotGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
