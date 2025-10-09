import { Injectable } from '@angular/core';
import { Adventurer, AdventurerFormData } from '../../models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdventurerService {
  private readonly baseUrl = `${environment.apiUrl}/adventurers`;

  constructor(private readonly http: HttpClient) { }

  createAdventurer(data: AdventurerFormData): Observable<Adventurer> {
    return this.http.post<Adventurer>(this.baseUrl, data);
  }
}
