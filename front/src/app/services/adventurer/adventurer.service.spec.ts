import { TestBed } from '@angular/core/testing';

import { AdventurerService } from './adventurer.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AdventurerService', () => {
  let service: AdventurerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        AdventurerService,
      ],
    });
    service = TestBed.inject(AdventurerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
