import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './AuthService';
@Injectable({
  providedIn: 'root'
})
export class authorezationService {

  baseUrl: string = "http://localhost:3000/api/auth";

  constructor(
    private http: HttpClient,
    private authService:AuthService
  ) { }

  registration(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
      const body = { email, password };

    return this.http.post(`${this.baseUrl}/login`, body);
  }
  getUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':  `${this.authService.currentToken}`,
    });
    return this.http.get(`${this.baseUrl}/user`,{ headers });
  }

}
