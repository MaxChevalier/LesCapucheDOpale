import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialty } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private readonly baseUrl = `/api/specialty`;

  constructor(private readonly http: HttpClient) { }

  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.baseUrl);
  }
}
