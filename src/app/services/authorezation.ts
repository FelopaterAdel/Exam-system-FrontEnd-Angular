import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class authorezationService {

  baseUrl: string = "http://localhost:3000/api/auth";

  constructor(private http: HttpClient) { }

  registration(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
      const body = { email, password };

    return this.http.post(`${this.baseUrl}/login`, body);
  }

}
