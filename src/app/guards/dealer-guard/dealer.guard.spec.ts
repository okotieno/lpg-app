import { TestBed } from '@angular/core/testing';

import { DealerGuard } from './dealer.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: DealerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(DealerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
