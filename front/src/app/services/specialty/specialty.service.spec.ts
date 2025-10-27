import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SpecialtyService } from './specialty.service';
import { Specialty } from '../../models/models';
import { provideHttpClient } from '@angular/common/http';

describe('SpecialtyService', () => {
  let service: SpecialtyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialtyService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(SpecialtyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête HTTP inattendue n'est restée en suspens
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve specialties from the API via GET', () => {
    const mockSpecialties: Specialty[] = [
      { id: 1, name: 'Cardiology' },
      { id: 2, name: 'Neurology' },
    ];

    service.getSpecialties().subscribe((specialties) => {
      expect(specialties).toEqual(mockSpecialties);
      expect(specialties.length).toBe(2);
      expect(specialties[0].name).toBe('Cardiology');
    });

    const req = httpMock.expectOne(`/api/specialty`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpecialties);
  });
});
