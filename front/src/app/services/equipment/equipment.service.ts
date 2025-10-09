import { Injectable } from '@angular/core';
import { EquipmentType } from '../../models/equipment-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private readonly baseUrl = `${environment.apiUrl}/equipment-type`;

  constructor(private readonly http: HttpClient) { }

  getEquipment(): Observable<EquipmentType[]> {
    return this.http.get<EquipmentType[]>(this.baseUrl);
  }
}
