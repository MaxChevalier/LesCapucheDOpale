import { TestBed } from '@angular/core/testing';

import { ConsumableService } from './consumable.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ConsumableService', () => {
  let service: ConsumableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        ConsumableService,
      ],
    });
    service = TestBed.inject(ConsumableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
