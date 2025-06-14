import { IExamResult } from './../models/IExamResult';
import { AuthService } from './AuthService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({

  providedIn: 'root'

})
export class resultService {
  baseUrl: string = "https://exam-system-backend-nodejs-production.up.railway.app/i/results"
  constructor(private http: HttpClient, private authService: AuthService) { }

 submitExam(examId: string, answers: any): Observable<IExamResult> {
   const headers = new HttpHeaders({
      'Authorization':  `${this.authService.currentToken}`,
    });
  
  const payload = {
    answers: answers
  };
  
  return this.http.post<IExamResult>(`${this.baseUrl}/${examId}`, payload, { headers });
}
  getResult(examId: string): Observable<IExamResult> {
  const headers = new HttpHeaders({
      'Authorization':  `${this.authService.currentToken}`,
    });
  
  return this.http.get<IExamResult>(`${this.baseUrl}/${examId}`, { headers })
    .pipe(
      catchError(error => {
        console.error('Failed to get exam result:', error);
        return throwError(error);
      })
    );
}


}
