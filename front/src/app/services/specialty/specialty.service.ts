import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialty } from '../../models/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private readonly baseUrl = `${environment.apiUrl}/specialty`;

  constructor(private readonly http: HttpClient) { }

  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.baseUrl);
  }
}
