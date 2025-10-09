import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SpecialtyService } from './specialty.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SpecialtyService', () => {
  let service: SpecialtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(), 
        SpecialtyService,
      ],
    });

    service = TestBed.inject(SpecialtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
