import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly urlUser = `/api/users`;
  private readonly urlAuth = `/api/auth`;

  constructor(private readonly http: HttpClient) { }

  signUp(user: any): Observable<any> {
    return this.http.post<any>(this.urlUser, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.urlAuth + '/login', user);
  }

  isLogin(): Observable<boolean> {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== '') {
      // return this.http.get<boolean>(this.urlAuth + '/validate-token');
      return of(true);
    }
    return of(false);
  }
}