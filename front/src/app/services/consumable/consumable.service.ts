import { Injectable } from '@angular/core';
import { ConsumableType } from '../../models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsumableService {
  private readonly baseUrl = `${environment.apiUrl}/consumableType`;

  constructor(private readonly http: HttpClient) { }

  getConsumables(): Observable<ConsumableType[]> {
    return this.http.get<ConsumableType[]>(this.baseUrl);
  }
}
