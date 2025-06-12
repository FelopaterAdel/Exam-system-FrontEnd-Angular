import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private jwtHelper = new JwtHelperService();

  constructor(
    private router: Router

  ) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.tokenSubject.next(token);
    }
  }
  getUserRole(): string | null {
    const token = this.currentToken;
    if (!token) return null;

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
  getUserId(): string | null {
    const token = this.currentToken;
    if (!token) return null;

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.id;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  isTeacher(): boolean {
    return this.getUserRole() === 'teacher';
  }

  isStudent(): boolean {
    return this.getUserRole() === 'student';
  }
  get token$() {
    return this.tokenSubject.asObservable();

  }

  get currentToken() {
    return this.tokenSubject.value;
  }

  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
    this.tokenSubject.next(token);
  }

  removeToken() {
    localStorage.removeItem('auth_token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return !!this.currentToken;
  }
}