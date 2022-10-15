import { TestBed } from '@angular/core/testing';

import { DepotGuard } from './dealer.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: DepotGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(DepotGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
