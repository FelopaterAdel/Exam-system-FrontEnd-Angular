import { IExam } from '../models/IExam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable({

  providedIn: 'root'

})
export class examService {
  baseUrl: string = "https://exam-system-backend-nodejs-production.up.railway.app/api/exams"
  // baseUrl: string = "http://127.0.0.1:3000/api/exams"

  constructor(private http: HttpClient,private authService:AuthService) { }

  getAllExams(): Observable<IExam[]> {
    const headers = new HttpHeaders({
      'Authorization':  `${this.authService.currentToken}`,
    });

    return this.http.get<IExam[]>(this.baseUrl,{ headers });
  }

  getExamById(examId: string): Observable<IExam> {
    return this.http.get<IExam>(`${this.baseUrl}/${examId}`,)
  }
  createExam(exam: IExam): Observable<IExam> {
    const headers = new HttpHeaders({
      'Authorization':  `${this.authService.currentToken}`,
    });
    return this.http.post<IExam>(`${this.baseUrl}`, exam ,{ headers })

  }

  editExam(examId: string, exam: any): Observable<IExam> {
    return this.http.put<IExam>(`${this.baseUrl}/${examId}`, exam);
  }

  deleteExam(examId: string): Observable<IExam> {
    console.log('Sending request with ID:', examId);
    return this.http.delete<IExam>(`${this.baseUrl}/${examId}`);

  }
}
